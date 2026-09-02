/* ==========================================================================
   BBC - Billiards Bar Cafe
   Shared front-end runtime: auth, cart, orders, bookings, navbar, toasts.

   Everything persists in localStorage. There is no server behind this site
   (it is published as static files), so this is a self contained demo of the
   ordering / booking journey - see the note on hashPassword() below.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ base
     Pages live both at the site root (menu.html) and one level down
     (view_page/index.html), so links are resolved against wherever app.js
     was loaded from.
     ------------------------------------------------------------------ */
  var base = (function () {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName('script');
      for (var i = all.length - 1; i >= 0; i--) {
        if (/app\/app\.js/.test(all[i].src)) { s = all[i]; break; }
      }
    }
    if (!s) return '';
    return s.getAttribute('src').replace(/app\/app\.js.*$/, '');
  })();

  /* ---------------------------------------------------------------- store */
  var KEYS = {
    users: 'bbc_users',
    session: 'bbc_session',
    cart: 'bbc_cart',
    orders: 'bbc_orders',
    bookings: 'bbc_bookings',
    pending: 'bbc_pending'
  };

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      toast('Storage is full or blocked by your browser.', true);
      return false;
    }
  }

  /* ----------------------------------------------------------------- utils */
  function money(n) {
    return '₹' + Number(n || 0).toLocaleString('en-IN');
  }

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function uid(prefix) {
    var stamp = Date.now().toString(36).toUpperCase().slice(-5);
    var rand = Math.random().toString(36).toUpperCase().slice(2, 5);
    return prefix + '-' + stamp + rand;
  }

  function todayISO() {
    var d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  function prettyDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''));
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function prettyDateTime(ms) {
    return new Date(ms).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit'
    });
  }

  /* Stable small hash - used for demo seat occupancy and password scrambling. */
  function hash32(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return h >>> 0;
  }

  /* ------------------------------------------------------------------ toast */
  function toast(msg, isError) {
    var host = document.getElementById('toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toast-host';
      document.body.appendChild(host);
    }
    var el = document.createElement('div');
    el.className = 'toast' + (isError ? ' err' : '');
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(function () { el.remove(); }, 2900);
  }

  /* ------------------------------------------------------------------- auth
     NOTE: passwords are scrambled with a plain hash before being written to
     localStorage. That keeps them out of the store in readable form, but it
     is NOT security - anyone with access to the browser can read the data.
     Wire this to a real backend before using it with real accounts.
     ------------------------------------------------------------------- */
  function hashPassword(pwd) {
    return hash32('bbc$' + pwd).toString(16) + hash32(pwd + '$bbc').toString(16);
  }

  var auth = {
    users: function () { return read(KEYS.users, []); },

    current: function () {
      var id = read(KEYS.session, null);
      if (!id) return null;
      var found = null;
      auth.users().forEach(function (u) { if (u.id === id) found = u; });
      return found;
    },

    register: function (name, email, phone, password) {
      email = String(email || '').trim().toLowerCase();
      var users = auth.users();
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          return { ok: false, error: 'This email is already registered. Try logging in.' };
        }
      }
      var user = {
        id: uid('U'),
        name: String(name).trim(),
        email: email,
        phone: String(phone).trim(),
        pwd: hashPassword(password),
        joinedAt: Date.now()
      };
      users.push(user);
      write(KEYS.users, users);
      write(KEYS.session, user.id);
      return { ok: true, user: user };
    },

    login: function (email, password) {
      email = String(email || '').trim().toLowerCase();
      var users = auth.users();
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          if (users[i].pwd !== hashPassword(password)) {
            return { ok: false, error: 'Incorrect password. Please try again.' };
          }
          write(KEYS.session, users[i].id);
          return { ok: true, user: users[i] };
        }
      }
      return { ok: false, error: 'No account found with this email.' };
    },

    logout: function () {
      localStorage.removeItem(KEYS.session);
    },

    /* Sends the visitor to login and returns them here afterwards. */
    require: function () {
      if (auth.current()) return true;
      var here = location.pathname.split('/').pop() + location.search;
      location.href = base + 'login.html?next=' + encodeURIComponent(here || 'index.html');
      return false;
    }
  };

  /* ------------------------------------------------------------------- cart */
  var cart = {
    items: function () { return read(KEYS.cart, []); },

    save: function (items) {
      write(KEYS.cart, items);
      document.dispatchEvent(new CustomEvent('bbc:cart'));
    },

    count: function () {
      return cart.items().reduce(function (n, i) { return n + i.qty; }, 0);
    },

    subtotal: function () {
      return cart.items().reduce(function (n, i) { return n + i.price * i.qty; }, 0);
    },

    add: function (dish, qty) {
      qty = qty || 1;
      var items = cart.items();
      var hit = null;
      items.forEach(function (i) { if (i.id === dish.id) hit = i; });
      if (hit) {
        hit.qty += qty;
      } else {
        items.push({
          id: dish.id, name: dish.name, price: dish.price,
          img: dish.img, veg: dish.veg, category: dish.category, qty: qty
        });
      }
      cart.save(items);
    },

    setQty: function (id, qty) {
      var items = cart.items().filter(function (i) {
        if (i.id !== id) return true;
        i.qty = qty;
        return qty > 0;
      });
      cart.save(items);
    },

    qtyOf: function (id) {
      var q = 0;
      cart.items().forEach(function (i) { if (i.id === id) q = i.qty; });
      return q;
    },

    remove: function (id) {
      cart.save(cart.items().filter(function (i) { return i.id !== id; }));
    },

    clear: function () { cart.save([]); },

    /* Subtotal -> delivery -> tax -> total. `type` is dine-in|takeaway|delivery. */
    totals: function (type) {
      var c = window.BBC_DATA.charges;
      var sub = cart.subtotal();
      var delivery = (type === 'delivery' && sub > 0 && sub < c.freeDeliveryOver) ? c.deliveryFee : 0;
      var tax = Math.round(sub * c.taxRate);
      return { subtotal: sub, delivery: delivery, tax: tax, total: sub + delivery + tax };
    }
  };

  /* --------------------------------------------------------------- records */
  var records = {
    orders: function () {
      var me = auth.current();
      return read(KEYS.orders, []).filter(function (o) { return me && o.userId === me.id; })
        .sort(function (a, b) { return b.createdAt - a.createdAt; });
    },

    bookings: function () {
      var me = auth.current();
      return read(KEYS.bookings, []).filter(function (b) { return me && b.userId === me.id; })
        .sort(function (a, b) { return b.createdAt - a.createdAt; });
    },

    allBookings: function () { return read(KEYS.bookings, []); },

    saveOrder: function (order) {
      var all = read(KEYS.orders, []);
      all.push(order);
      write(KEYS.orders, all);
      return order;
    },

    saveBooking: function (booking) {
      var all = read(KEYS.bookings, []);
      all.push(booking);
      write(KEYS.bookings, all);
      return booking;
    },

    find: function (id) {
      var hit = null;
      read(KEYS.orders, []).concat(read(KEYS.bookings, [])).forEach(function (r) {
        if (r.id === id) hit = r;
      });
      return hit;
    }
  };

  /* --------------------------------------------------------------- seating
     A seat is unavailable when someone has booked it for that date + slot.
     A handful of seats are also shown as pre-booked so an empty demo floor
     still looks like a real evening - derived from a stable hash so the map
     does not reshuffle on every render.
     --------------------------------------------------------------- */
  function seatTaken(code, date, slot) {
    var clash = false;
    records.allBookings().forEach(function (b) {
      if (b.date === date && b.slot === slot && b.seats.indexOf(code) !== -1) clash = true;
    });
    if (clash) return true;
    return hash32(code + '|' + date + '|' + slot) % 100 < 22;
  }

  /* ------------------------------------------------------------ pending buy
     Held in sessionStorage between checkout -> payment -> confirmation so a
     refresh of the payment page does not lose the basket.
     ------------------------------------------------------------ */
  var pending = {
    set: function (data) { sessionStorage.setItem(KEYS.pending, JSON.stringify(data)); },
    get: function () {
      try { return JSON.parse(sessionStorage.getItem(KEYS.pending)); } catch (e) { return null; }
    },
    clear: function () { sessionStorage.removeItem(KEYS.pending); }
  };

  /* ----------------------------------------------------------------- navbar */
  var NAV_LINKS = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'menu', label: 'Menu', href: 'menu.html' },
    { key: 'booking', label: 'Book Seat', href: 'booking.html' },
    { key: 'services', label: 'Services', href: 'sevices.html' },
    { key: 'account', label: 'My Account', href: 'account.html' }
  ];

  function renderNav(activeKey) {
    var host = document.getElementById('bbc-nav');
    if (!host) return;
    var me = auth.current();

    var links = NAV_LINKS.map(function (l) {
      return '<li><a href="' + base + l.href + '"' +
        (l.key === activeKey ? ' class="active"' : '') + '>' + l.label + '</a></li>';
    }).join('');

    host.className = 'bbc-nav';
    host.innerHTML =
      '<div class="inner">' +
        '<a class="bbc-brand" href="' + base + 'index.html">BBC</a>' +
        '<ul class="bbc-links" id="bbc-links">' + links + '</ul>' +
        '<div class="bbc-actions">' +
          '<button class="icon-btn" id="bbc-cart-btn" aria-label="Open cart">' +
            '<i class="fa-solid fa-cart-shopping"></i>' +
            '<span class="cart-count hide" id="bbc-cart-count">0</span>' +
          '</button>' +
          (me
            ? '<a class="btn btn-sm btn-plain" href="' + base + 'account.html">' +
                '<i class="fa-regular fa-user"></i> ' + esc(me.name.split(' ')[0]) + '</a>'
            : '<a class="btn btn-sm btn-primary" href="' + base + 'login.html">Login</a>') +
          '<button class="icon-btn nav-toggle" id="bbc-nav-toggle" aria-label="Menu">' +
            '<i class="fa-solid fa-bars"></i></button>' +
        '</div>' +
      '</div>';

    document.getElementById('bbc-nav-toggle').addEventListener('click', function () {
      document.getElementById('bbc-links').classList.toggle('open');
    });
    document.getElementById('bbc-cart-btn').addEventListener('click', openDrawer);
    paintCount();
  }

  function paintCount() {
    var n = cart.count();
    document.querySelectorAll('#bbc-cart-count, .js-cart-count').forEach(function (el) {
      el.textContent = n;
      el.classList.toggle('hide', n === 0);
    });
  }

  /* ------------------------------------------------------------- cart drawer */
  function buildDrawer() {
    if (document.getElementById('bbc-drawer')) return;
    var backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    backdrop.id = 'bbc-drawer-backdrop';

    var drawer = document.createElement('aside');
    drawer.className = 'drawer';
    drawer.id = 'bbc-drawer';
    drawer.innerHTML =
      '<header><h3>Your Cart</h3><button class="close-x" id="bbc-drawer-close">&times;</button></header>' +
      '<div class="body" id="bbc-drawer-body"></div>' +
      '<footer>' +
        '<div class="summary-total"><span>Subtotal</span><span id="bbc-drawer-total">₹0</span></div>' +
        '<a class="btn btn-primary btn-block mt-4" href="' + base + 'cart.html">View Cart &amp; Checkout</a>' +
      '</footer>';

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
    backdrop.addEventListener('click', closeDrawer);
    document.getElementById('bbc-drawer-close').addEventListener('click', closeDrawer);
  }

  function paintDrawer() {
    var body = document.getElementById('bbc-drawer-body');
    if (!body) return;
    var items = cart.items();

    if (!items.length) {
      body.innerHTML = '<div class="empty-state"><i class="fa-solid fa-basket-shopping"></i>' +
        'Your cart is empty.<br><a class="link-y" href="' + base + 'menu.html">Browse the menu</a></div>';
    } else {
      body.innerHTML = items.map(function (i) {
        return '<div class="cart-line">' +
          '<img src="' + esc(i.img) + '" alt="' + esc(i.name) + '">' +
          '<div class="info"><h4>' + esc(i.name) + '</h4>' +
            '<div class="meta">' + money(i.price) + ' each</div>' +
            '<div class="qty mt-2" style="margin-top:8px">' +
              '<button data-dec="' + esc(i.id) + '">-</button>' +
              '<span>' + i.qty + '</span>' +
              '<button data-inc="' + esc(i.id) + '">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="right"><div class="amount">' + money(i.price * i.qty) + '</div>' +
            '<button class="remove-btn" data-del="' + esc(i.id) + '">Remove</button></div>' +
        '</div>';
      }).join('');
    }
    document.getElementById('bbc-drawer-total').textContent = money(cart.subtotal());
  }

  function openDrawer() {
    buildDrawer();
    paintDrawer();
    document.getElementById('bbc-drawer').classList.add('open');
    document.getElementById('bbc-drawer-backdrop').classList.add('open');
  }

  function closeDrawer() {
    var d = document.getElementById('bbc-drawer');
    if (!d) return;
    d.classList.remove('open');
    document.getElementById('bbc-drawer-backdrop').classList.remove('open');
  }

  /* Quantity controls inside the drawer (and anywhere else using the same
     data-inc / data-dec / data-del attributes). */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-inc],[data-dec],[data-del]');
    if (!t) return;
    if (t.dataset.inc) cart.setQty(t.dataset.inc, cart.qtyOf(t.dataset.inc) + 1);
    else if (t.dataset.dec) cart.setQty(t.dataset.dec, cart.qtyOf(t.dataset.dec) - 1);
    else if (t.dataset.del) cart.remove(t.dataset.del);
  });

  document.addEventListener('bbc:cart', function () {
    paintCount();
    paintDrawer();
  });

  /* Keep tabs in sync when the cart changes in another window. */
  window.addEventListener('storage', function (e) {
    if (e.key === KEYS.cart) { paintCount(); paintDrawer(); }
  });

  /* ------------------------------------------------------------------ boot */
  function init(activeKey) {
    renderNav(activeKey);
    buildDrawer();
    paintDrawer();
  }

  window.BBC = {
    base: base, keys: KEYS,
    read: read, write: write,
    money: money, esc: esc, uid: uid,
    todayISO: todayISO, prettyDate: prettyDate, prettyDateTime: prettyDateTime,
    toast: toast, hash32: hash32,
    auth: auth, cart: cart, records: records, pending: pending,
    seatTaken: seatTaken,
    init: init, openDrawer: openDrawer, closeDrawer: closeDrawer, paintCount: paintCount
  };
})();

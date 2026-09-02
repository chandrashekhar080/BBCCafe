/* ==========================================================================
   Small companion script for the original Tailwind pages (index, services,
   view_page, snooker). Those pages keep their own markup and stylesheet, so
   instead of the shared navbar they just need two live bits:

     #navCartCount  - the number of items in the cart
     #navUser       - "Login" or the signed in visitor's first name

   Both read the same localStorage keys that app/app.js writes.
   ========================================================================== */
(function () {
  'use strict';

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function paint() {
    var badge = document.getElementById('navCartCount');
    if (badge) {
      var n = read('bbc_cart', []).reduce(function (t, i) { return t + i.qty; }, 0);
      badge.textContent = n;
      badge.classList.toggle('hidden', n === 0);
      badge.style.display = n === 0 ? 'none' : 'inline-flex';
    }

    var link = document.getElementById('navUser');
    if (link) {
      var id = read('bbc_session', null);
      var me = null;
      read('bbc_users', []).forEach(function (u) { if (u.id === id) me = u; });
      link.textContent = me ? me.name.split(' ')[0] : 'Login';
    }
  }

  document.addEventListener('DOMContentLoaded', paint);
  window.addEventListener('storage', paint);
  window.addEventListener('pageshow', paint);   /* back/forward cache */
  paint();
})();

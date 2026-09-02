/* ==========================================================================
   BBC - static catalogue data.
   Loaded as a plain script (no bundler) and exposed on window.BBC_DATA so it
   works from the site root as well as from /view_page and /snooker.
   ========================================================================== */
(function () {
  'use strict';

  var MENU = [
    /* ---------------------------------------------------------- Breakfast */
    {
      id: 'bf-01', name: 'Veg Cheese Sandwich', category: 'Breakfast', veg: true, price: 99,
      desc: 'Masala cheese sandwich with a spicy potato filling, grilled golden.',
      img: 'https://b.zmtcdn.com/data/dish_photos/849/a66e0684c19e8ab3008ea05b8df59849.jpg'
    },
    {
      id: 'bf-02', name: 'Mixed Vegetable Sandwich', category: 'Breakfast', veg: true, price: 89,
      desc: 'Instant, easy and tempting - the perfect light morning bite.',
      img: 'https://b.zmtcdn.com/data/dish_photos/540/c2978f1e1d70aeecb16e0ff26c550540.jpg'
    },
    {
      id: 'bf-03', name: 'Poha Jalebi Plate', category: 'Breakfast', veg: true, price: 69,
      desc: 'The Indore classic - soft poha with sev and hot crisp jalebi.',
      img: 'https://b.zmtcdn.com/data/dish_photos/e9a/9707b419e40552ec9c11e17d13644e9a.jpg'
    },
    {
      id: 'bf-04', name: 'Masala Omelette & Toast', category: 'Breakfast', veg: false, price: 119,
      desc: 'Three egg omelette with onion, chilli and butter toast.',
      img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=60'
    },

    /* ----------------------------------------------------------- Starters */
    {
      id: 'st-01', name: 'Paneer Tikka', category: 'Starters', veg: true, price: 249,
      desc: 'Charred cottage cheese cubes marinated in hung curd and spices.',
      img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'st-02', name: 'Chilli Paneer Dry', category: 'Starters', veg: true, price: 229,
      desc: 'Indo-Chinese favourite tossed with capsicum and spring onion.',
      img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'st-03', name: 'Tandoori Chicken (Half)', category: 'Starters', veg: false, price: 289,
      desc: 'Overnight marinated chicken finished in the clay oven.',
      img: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'st-04', name: 'Chicken Malai Tikka', category: 'Starters', veg: false, price: 309,
      desc: 'Creamy, mildly spiced boneless tikka - a crowd pleaser.',
      img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=60'
    },

    /* -------------------------------------------------------- Main Course */
    {
      id: 'mc-01', name: 'Paneer Butter Masala', category: 'Main Course', veg: true, price: 269,
      desc: 'Rich tomato-cashew gravy, slow simmered with butter and cream.',
      img: 'https://b.zmtcdn.com/data/pictures/4/20397354/3b2f1a5e57dcb79fcbabd40e181ff0ba_o2_featured_v2.jpg'
    },
    {
      id: 'mc-02', name: 'Dal Makhani', category: 'Main Course', veg: true, price: 219,
      desc: 'Black lentils cooked overnight, finished with white butter.',
      img: 'https://images.unsplash.com/photo-1626500155537-4b6d1c4bd2b1?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'mc-03', name: 'Butter Chicken', category: 'Main Course', veg: false, price: 329,
      desc: 'Tandoori chicken in a silky makhani gravy. Best with naan.',
      img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'mc-04', name: 'Hyderabadi Chicken Biryani', category: 'Main Course', veg: false, price: 299,
      desc: 'Dum cooked long grain rice with raita and salan on the side.',
      img: 'https://b.zmtcdn.com/data/pictures/1/20935481/80bd900950446ca8110d944029274583_o2_featured_v2.jpg'
    },
    {
      id: 'mc-05', name: 'Veg Hyderabadi Biryani', category: 'Main Course', veg: true, price: 249,
      desc: 'Seasonal vegetables layered with saffron rice and fried onion.',
      img: 'https://b.zmtcdn.com/data/pictures/0/20655340/87bfe051d5981c3dafa8357fe255c50f_o2_featured_v2.jpg'
    },
    {
      id: 'mc-06', name: 'Butter Naan (2 pcs)', category: 'Main Course', veg: true, price: 79,
      desc: 'Fresh from the tandoor, brushed generously with butter.',
      img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=60'
    },

    /* -------------------------------------------------------- Fast Food */
    {
      id: 'ff-01', name: 'Classic Cheese Burger', category: 'Fast Food', veg: true, price: 159,
      desc: 'Crisp veg patty, double cheese, house sauce and fries.',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'ff-02', name: 'Peri Peri Loaded Fries', category: 'Fast Food', veg: true, price: 139,
      desc: 'Crispy fries tossed in peri peri, topped with molten cheese.',
      img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'ff-03', name: 'Farmhouse Pizza (Medium)', category: 'Fast Food', veg: true, price: 279,
      desc: 'Hand tossed base with onion, capsicum, corn and mushroom.',
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'ff-04', name: 'Chicken Wings (6 pcs)', category: 'Fast Food', veg: false, price: 249,
      desc: 'Smoky barbecue glaze with a cooling dip on the side.',
      img: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'ff-05', name: 'Hakka Noodles', category: 'Fast Food', veg: true, price: 169,
      desc: 'Wok tossed noodles with julienned vegetables and soy.',
      img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=60'
    },

    /* -------------------------------------------------------- Beverages */
    {
      id: 'bv-01', name: 'Cold Coffee with Ice Cream', category: 'Beverages', veg: true, price: 149,
      desc: 'Thick blended coffee crowned with a vanilla scoop.',
      img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'bv-02', name: 'Masala Chai', category: 'Beverages', veg: true, price: 49,
      desc: 'Brewed strong with ginger, cardamom and a hint of clove.',
      img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'bv-03', name: 'Virgin Mojito', category: 'Beverages', veg: true, price: 129,
      desc: 'Muddled mint and lime over crushed ice - the table favourite.',
      img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'bv-04', name: 'Fresh Lime Soda', category: 'Beverages', veg: true, price: 79,
      desc: 'Sweet, salted or mixed - tell us at checkout.',
      img: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=800&q=60'
    },

    /* --------------------------------------------------------- Desserts */
    {
      id: 'ds-01', name: 'Sizzling Brownie', category: 'Desserts', veg: true, price: 199,
      desc: 'Warm walnut brownie, vanilla ice cream and hot chocolate.',
      img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'ds-02', name: 'Gulab Jamun (2 pcs)', category: 'Desserts', veg: true, price: 89,
      desc: 'Served warm in cardamom sugar syrup.',
      img: 'https://images.unsplash.com/photo-1601303516534-bf0b1eb70237?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'ds-03', name: 'Choco Lava Cake', category: 'Desserts', veg: true, price: 159,
      desc: 'Molten centre, best shared - or not.',
      img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=60'
    }
  ];

  /* ------------------------------------------------------------------------
     Seating plan. Snooker tables are charged per hour, dining/party tables
     carry a refundable reservation amount.
     ------------------------------------------------------------------------ */
  var ZONES = [
    {
      id: 'snooker',
      name: 'Snooker Floor',
      note: 'Tournament grade tables, charged per hour. Cue and chalk included.',
      icon: 'fa-solid fa-bowling-ball',
      seats: [
        { code: 'S1', cap: 4, price: 300 }, { code: 'S2', cap: 4, price: 300 },
        { code: 'S3', cap: 4, price: 300 }, { code: 'S4', cap: 6, price: 400 },
        { code: 'S5', cap: 6, price: 400 }, { code: 'S6', cap: 6, price: 400 }
      ]
    },
    {
      id: 'cafe',
      name: 'Cafe Dining',
      note: 'Indoor air conditioned seating next to the kitchen counter.',
      icon: 'fa-solid fa-utensils',
      seats: [
        { code: 'C1', cap: 2, price: 150 }, { code: 'C2', cap: 2, price: 150 },
        { code: 'C3', cap: 4, price: 200 }, { code: 'C4', cap: 4, price: 200 },
        { code: 'C5', cap: 4, price: 200 }, { code: 'C6', cap: 6, price: 300 },
        { code: 'C7', cap: 6, price: 300 }, { code: 'C8', cap: 8, price: 400 }
      ]
    },
    {
      id: 'lounge',
      name: 'Party Lounge',
      note: 'Private booths with music control - ideal for birthdays.',
      icon: 'fa-solid fa-champagne-glasses',
      seats: [
        { code: 'P1', cap: 10, price: 800 }, { code: 'P2', cap: 10, price: 800 },
        { code: 'P3', cap: 15, price: 1200 }, { code: 'P4', cap: 20, price: 1600 }
      ]
    }
  ];

  var SLOTS = [
    '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM',
    '05:00 PM', '06:30 PM', '08:00 PM', '09:30 PM'
  ];

  var CATEGORIES = ['Breakfast', 'Starters', 'Main Course', 'Fast Food', 'Beverages', 'Desserts'];

  window.BBC_DATA = {
    menu: MENU,
    categories: CATEGORIES,
    zones: ZONES,
    slots: SLOTS,
    /* Charges applied at checkout. */
    charges: { deliveryFee: 40, taxRate: 0.05, freeDeliveryOver: 999 }
  };
})();

// Single source of truth for every piece of copy and imagery on the site.
// Components stay presentational; edit words and pictures here.
//
// Every image path is local (`/assets/...`). No external image host is used.

export const venue = {
  name: 'BBC',
  fullName: 'Billiards Bar Cafe',
  city: 'Vijay Nagar, Indore',
  tagline: 'Twelve tables. A late kitchen. One long night.',
  since: '2020',
}

export const contact = {
  phones: ['+91 8959281584', '+91 7869321018'],
  address: [
    'Plot 18, Ratnalok colony,',
    'BBC Billiards Bar Cafe, beside Apolo premier,',
    'Vijay Nagar, Indore, Madhya Pradesh 452010',
  ],
  addressLine: 'Plot 18, Ratnalok colony, beside Apolo premier, Vijay Nagar, Indore, MP 452010',
  emails: ['info@bbccafe.in', 'support@bbccafe.in'],
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=BBC+Billiards+Bar+Cafe+Vijay+Nagar+Indore',
}

export const hours = [
  { days: 'Monday – Thursday', time: '11:00 am – 12:30 am' },
  { days: 'Friday – Sunday', time: '11:00 am – 1:30 am' },
  { days: 'Kitchen closes', time: '45 minutes before last call' },
]

// `icon` maps to a key in components/Icon.jsx — no icon-font CDN needed.
export const socials = [
  { icon: 'instagram', href: 'https://www.instagram.com/_chandrashekhar_08/', label: 'Instagram' },
  { icon: 'twitter', href: 'https://twitter.com/i/flow/login', label: 'Twitter' },
  { icon: 'facebook', href: 'https://www.facebook.com/', label: 'Facebook' },
  { icon: 'youtube', href: 'https://www.youtube.com/channel/UCF4jfT2811ghi2FF7w5ZWtA', label: 'YouTube' },
  { icon: 'mail', href: 'mailto:info@bbccafe.in', label: 'Email' },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Snooker', to: '/snooker' },
  { label: 'Services', to: '/services' },
  { label: 'Menu', to: '/restaurant' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

export const bookingTypes = [
  'For Party Booking',
  'For Snooker Booking',
  'Birthday Party Booking',
  'Other Reason',
]

export const stats = [
  { value: '499+', label: 'Players a month' },
  { value: '12+', label: 'Tables on the floor' },
  { value: '4+', label: 'Years in Vijay Nagar' },
]

// Scrolling marquee band.
export const highlights = [
  { title: 'Full-size snooker', to: '/snooker' },
  { title: 'Private party floor', to: '/services#party' },
  { title: 'Cafe till late', to: '/services#cafe' },
  { title: 'Kitchen open past midnight', to: '/restaurant' },
  { title: 'Cues & chalk included', to: '/snooker' },
  { title: 'Birthdays done properly', to: '/services#party' },
]

// The three things the venue is, on the home page.
export const pillars = [
  {
    index: '01',
    kicker: 'The floor',
    title: 'Snooker',
    body: 'Twelve full-size tables under brass pendants, re-clothed every season. Cues, rests and chalk are on the house — walk in with nothing and still play a decent frame.',
    price: 'From ₹99 / hour',
    to: '/snooker',
    cta: 'See the tables',
    img: '/assets/snooker-01.jpg',
    alt: 'A rack of red snooker balls on lit baize',
  },
  {
    index: '02',
    kicker: 'The room',
    title: 'Parties',
    body: 'Block the back floor for a birthday, a farewell or a Friday that got out of hand. Cake, sound and a table reserved to your name — we handle the rest.',
    price: 'From ₹249 / table',
    to: '/services#party',
    cta: 'Party tables',
    img: '/assets/party-01.jpg',
    alt: 'Confetti and warm lights across a dark party floor',
  },
  {
    index: '03',
    kicker: 'The kitchen',
    title: 'Cafe',
    body: 'Chai at four, biryani at eleven. The kitchen runs as late as the tables do, so nobody has to leave to eat.',
    price: 'From ₹15 a cup',
    to: '/restaurant',
    cta: 'Read the menu',
    img: '/assets/cafe-04.jpg',
    alt: 'Espresso and a warm pastry on dark slate',
  },
]

export const about = {
  title: 'A club room, not a sports bar',
  body: [
    'BBC opened in Vijay Nagar because Indore had plenty of places to eat and almost nowhere to play. We built one room that does both — twelve tables under warm light, a kitchen that stays open, and staff who will rack up for you without being asked.',
    'No cover, no dress code, no rush to clear your table. Students at six, office crowds at nine, and regulars who close the place at half past one.',
  ],
  img: '/assets/who_we_are.jpg',
  alt: 'Inside the BBC club room',
  facts: [
    ['Opened', '2020'],
    ['Tables', '12 full-size'],
    ['Neighbourhood', 'Vijay Nagar'],
  ],
}

export const reviews = [
  {
    name: 'Aditya Rane',
    role: 'Regular · plays Thursdays',
    body: 'Best-kept tables in Indore, and the only place that will still cook you a plate of biryani at midnight. I have been coming for two years and have never waited more than ten minutes for a table.',
    avatar: '/assets/avatar-01.jpg',
  },
  {
    name: 'Sana Qureshi',
    role: 'Booked her 24th here',
    body: 'We took the back floor for a birthday of eighteen people. They set the cake up, kept the food coming and let us run past closing. Cost less than any restaurant we quoted.',
    avatar: '/assets/avatar-02.jpg',
  },
  {
    name: 'Nikhil Verma',
    role: 'Works nearby',
    body: 'I come in alone after work, get a cutting chai and a table for an hour. Nobody hurries you. The lighting over the tables genuinely makes a difference to your game.',
    avatar: '/assets/avatar-03.jpg',
  },
]

// ---------- Services page ----------

export const restaurantMeals = [
  {
    category: 'Breakfast',
    title: 'Morning plate',
    body: 'Mysore sandwich or bread pattice with a cutting chai. On the counter from eleven, done in ten minutes.',
    price: '₹49',
    img: '/assets/dish-sandwich.jpg',
    alt: 'Grilled masala cheese sandwich cut into halves',
  },
  {
    category: 'Lunch',
    title: 'Afternoon thali',
    body: 'Dal, a seasonal sabzi, rice, two rotis and salad. The plate most of the office crowd orders without looking at the menu.',
    price: '₹99',
    img: '/assets/dish-thali.jpg',
    alt: 'North Indian thali with dal, curry, rice and roti',
  },
  {
    category: 'Dinner',
    title: 'Late dinner',
    body: 'Laziz biryani, tandoori plates and the paneer pizza combo — served right up to last call.',
    price: '₹149',
    img: '/assets/dish-biryani.jpg',
    alt: 'Biryani served in a copper handi',
  },
]

export const partyTables = [
  {
    title: 'Fresh Table — 01',
    price: '249',
    seats: 'Seats 6',
    body: 'A corner booth with its own pendant light. Enough room for a cake, a speaker and a small group that wants to hear itself talk.',
    features: ['Reserved for 3 hours', 'Cake cutting set up', 'Own bluetooth input'],
    img: '/assets/party-01.jpg',
    alt: 'Confetti falling through warm party lights',
  },
  {
    title: 'Lazy Table — 02',
    price: '249',
    seats: 'Seats 10',
    body: 'The long table by the bar. Good for office send-offs where half the group turns up an hour late.',
    features: ['Reserved for 4 hours', 'Split billing', 'Adjacent snooker table held'],
    img: '/assets/party-02.jpg',
    alt: 'Candles glowing on a birthday cake in a dark room',
  },
  {
    title: 'Relax Table — 03',
    price: '299',
    seats: 'Seats 16',
    body: 'The full back floor. Lights down, sound up, and the kitchen on standby until you are done.',
    features: ['Floor held for the evening', 'Custom playlist', 'Dedicated server'],
    img: '/assets/party-03.jpg',
    alt: 'Light beams over silhouettes on a dance floor',
  },
]

export const snookerTables = [
  {
    title: 'Snooker Table — 01',
    price: '299',
    seats: 'Full size',
    body: 'Front of house, brightest lamp on the floor. The table people ask for by name.',
    features: ['Re-clothed this season', 'Cues & rest included', 'Scoreboard at the rail'],
    img: '/assets/snooker-01.jpg',
    alt: 'Reds racked in a triangle on lit baize',
  },
  {
    title: 'Snooker Table — 02',
    price: '319',
    seats: 'Full size',
    body: 'Corner table with room behind every cushion — the one to take if you actually want to practise.',
    features: ['Widest cue clearance', 'Fresh nap', 'Chalk at the pocket'],
    img: '/assets/snooker-02.jpg',
    alt: 'A snooker corner pocket with balls nearby',
  },
  {
    title: 'Snooker Table — 03',
    price: '349',
    seats: 'Full size',
    body: 'The quiet table at the back, next to the cafe pass. Order without leaving your frame.',
    features: ['Table-side ordering', 'Quietest corner', 'Two-hour blocks'],
    img: '/assets/snooker-03.jpg',
    alt: 'A cue laid across baize beside the cue ball',
  },
]

export const cafeGallery = [
  { img: '/assets/bbcheoimg.jpg', alt: 'The BBC floor: snooker tables and cane seating' },
  { img: '/assets/cafe-02.jpg', alt: 'Backlit bottles along the cafe counter' },
  { img: '/assets/drink-tea.jpg', alt: 'Masala chai in a glass with whole spices' },
  { img: '/assets/cafe-01.jpg', alt: 'Latte art in a wide white cup' },
]

// ---------- Snooker page ----------

const snookerImgs = ['/assets/snooker-01.jpg', '/assets/snooker-02.jpg', '/assets/snooker-03.jpg']
const snookerNotes = [
  'Front of house, under the brightest lamp on the floor.',
  'Corner table with clear cue room behind every cushion.',
  'Back of the room, next to the cafe pass — order mid-frame.',
  'Newly re-clothed. The truest roll in the building.',
  'The practice table. Nobody minds if you set up the same shot forty times.',
  'Closest to the bar, and the loudest table on a Friday.',
]

export const snookerLineup = Array.from({ length: 6 }, (_, i) => ({
  title: `Table ${String(i + 1).padStart(2, '0')}`,
  subtitle: 'Full size · cues, rest & chalk included',
  body: snookerNotes[i],
  price: `₹${[99, 99, 119, 119, 149, 149][i]}`,
  unit: '/ hour',
  img: snookerImgs[i % snookerImgs.length],
  alt: 'Snooker table under warm club lighting',
}))

// ---------- Restaurant page ----------

export const topMenu = [
  {
    name: 'Veg Cheese Sandwich',
    sub: 'Breakfast',
    body: 'Masala cheese sandwich with a spiced potato filling, pressed until the cheese gives up.',
    price: '₹99',
    img: '/assets/dish-sandwich.jpg',
    alt: 'Toasted cheese sandwich halves on a plate',
  },
  {
    name: 'Bread Pattice',
    sub: 'Breakfast',
    body: 'Three fried pattice, green chutney on the side. The reason people come in at eleven.',
    price: '₹99',
    img: '/assets/dish-pattice.jpg',
    alt: 'Fried bread pattice in a lined basket',
  },
  {
    name: 'Cheese Masala Dosa',
    sub: 'South Indian',
    body: 'Fermented rice crepe, spiced potato, sambar and two chutneys. Best dosa in the neighbourhood.',
    price: '₹99',
    img: '/assets/dish-dosa.jpg',
    alt: 'Rolled masala dosa on a banana leaf',
  },
  {
    name: 'Cutting Chai',
    sub: 'All day',
    body: 'Twenty-four flavours behind the counter. Ginger and elaichi outsell the rest four to one.',
    price: '₹15',
    img: '/assets/drink-tea.jpg',
    alt: 'Masala chai in a glass with spices',
  },
  {
    name: 'Laziz Biryani',
    sub: 'Dinner',
    body: 'Hyderabadi-style, layered with fried onion and saffron rice. Ordered more than anything else after ten.',
    price: '₹150',
    img: '/assets/dish-biryani.jpg',
    alt: 'Biryani in a copper handi with mint',
  },
  {
    name: 'Tandoori Platter',
    sub: 'Dinner',
    body: 'Charred and cut, with onion, lemon and a green chutney that does most of the work.',
    price: '₹99',
    img: '/assets/dish-tandoori.jpg',
    alt: 'Tandoori pieces on a dark platter with lemon',
  },
]

export const menuCategories = ['All', 'Breakfast', 'Lunch', 'Dinner']

export const fullMenu = [
  {
    category: 'Breakfast',
    name: 'Mysore Sandwich',
    price: '₹99',
    body: 'Mysore masala sandwich with filter coffee.',
    img: '/assets/dish-sandwich.jpg',
    alt: 'Mysore masala sandwich',
  },
  {
    category: 'Lunch',
    name: 'North Indian Thali',
    price: '₹99',
    body: 'Dal, sabzi, rice, two rotis, salad and papad.',
    img: '/assets/dish-thali.jpg',
    alt: 'North Indian thali plate',
  },
  {
    category: 'Dinner',
    name: 'Misthan Bhandar',
    price: '₹99',
    body: 'Barfi, jalebi and laddoo from Apna Sweets, plated to order.',
    img: '/assets/dish-sweets.jpg',
    alt: 'Assorted Indian sweets on a brass tray',
  },
  {
    category: 'Lunch',
    name: 'Cheese Masala Dosa',
    price: '₹99',
    body: 'Crisp fermented crepe, spiced potato, sambar and chutney.',
    img: '/assets/dish-dosa.jpg',
    alt: 'Masala dosa with sambar and chutney',
  },
  {
    category: 'Breakfast',
    name: 'Bread Pattice',
    price: '₹99',
    body: 'Boiled potato stuffed in flatbread, fried, with chutney.',
    img: '/assets/dish-pattice.jpg',
    alt: 'Bread pattice with chutney',
  },
  {
    category: 'Dinner',
    name: 'Chapati, Poori & Dal Fry',
    price: '₹99',
    body: 'Two chapati, two poori and a bowl of tempered dal fry.',
    img: '/assets/dish-chapati.jpg',
    alt: 'Chapati, poori and a bowl of dal',
  },
  {
    category: 'Lunch',
    name: 'Dry Fruit Oat Meal',
    price: '₹99',
    body: 'Oats with almond, pistachio and raisin. The one healthy thing we sell.',
    img: '/assets/dish-oatmeal.jpg',
    alt: 'Bowl of oatmeal with dry fruit',
  },
  {
    category: 'Lunch',
    name: 'Achaari Paneer Pizza Combo',
    price: '₹99',
    body: 'Achaari paneer pizza, peri peri fries and a cold drink.',
    img: '/assets/dish-pizza.jpg',
    alt: 'Paneer pizza with a side of fries',
  },
]

export const venueImages = {
  hero: { img: '/assets/bbcheoimg.jpg', alt: 'The BBC floor: snooker tables under pendant lights' },
  snooker: { img: '/assets/snooker_bg.jpg', alt: 'A full-size snooker table lit by brass pendants' },
}

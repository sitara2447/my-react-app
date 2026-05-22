import { useState, useEffect } from "react";

const GOOGLE_FONT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const initialDestinations = [
  {
    id: 1, name: "Paris", country: "France", category: "city",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    description: "The City of Light — romance, art, and gastronomy.",
    rating: 4.8, likes: 342, price: "$1200",
    tags: ["romantic", "culture", "food"],
    hotels: ["Le Meurice", "Hôtel de Crillon", "Shangri-La Paris"],
    parks: ["Tuileries Garden", "Luxembourg Garden", "Bois de Boulogne"],
    malls: ["Galeries Lafayette", "Le Marais Boutiques", "Forum des Halles"],
    restaurants: ["Le Jules Verne", "Septime", "L'Ambroisie"],
    museums: ["Louvre Museum", "Musée d'Orsay", "Centre Pompidou"],
    whyVisit: "Paris is a dream destination with iconic landmarks like the Eiffel Tower, world-class cuisine, and unparalleled art & fashion scene.",
    reviews: [
      { user: "Aisha K.", avatar: "A", text: "Absolutely magical! Every corner is a postcard.", rating: 5, date: "2024-03-10" },
      { user: "John M.", avatar: "J", text: "Best trip of my life. Food was incredible!", rating: 5, date: "2024-02-22" },
    ]
  },
  {
    id: 2, name: "Tokyo", country: "Japan", category: "city",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    description: "Where ancient tradition meets neon-lit future.",
    rating: 4.9, likes: 521, price: "$1800",
    tags: ["modern", "culture", "food"],
    hotels: ["Park Hyatt Tokyo", "Aman Tokyo", "The Peninsula"],
    parks: ["Shinjuku Gyoen", "Ueno Park", "Yoyogi Park"],
    malls: ["Shibuya 109", "Roppongi Hills", "Ginza Six"],
    restaurants: ["Sukiyabashi Jiro", "Narisawa", "Den"],
    museums: ["Tokyo National Museum", "teamLab Borderless", "Ghibli Museum"],
    whyVisit: "Tokyo offers an unmatched blend of ultra-modern technology, centuries-old shrines, world's best ramen, and the safest streets on earth.",
    reviews: [
      { user: "Sara L.", avatar: "S", text: "Mind-blowing city. Could live here forever!", rating: 5, date: "2024-04-01" },
      { user: "Bilal R.", avatar: "B", text: "Cherry blossoms in spring — pure magic.", rating: 5, date: "2024-03-28" },
    ]
  },
  {
    id: 3, name: "Maldives", country: "Maldives", category: "beach",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    description: "Crystal waters, overwater bungalows, pure paradise.",
    rating: 4.7, likes: 289, price: "$3500",
    tags: ["beach", "luxury", "romantic"],
    hotels: ["Soneva Jani", "Six Senses Laamu", "Gili Lankanfushi"],
    parks: ["Banana Reef Marine Park", "HP Reef", "Maaya Thila"],
    malls: ["Male City Market", "STO Trade Centre", "Majeedhee Magu"],
    restaurants: ["Sea Fire Salt", "Ithaa Undersea Restaurant", "Muraka"],
    museums: ["National Museum Maldives", "Whale Submarine", "MV Discovery"],
    whyVisit: "The Maldives is the ultimate luxury escape — pristine beaches, vibrant coral reefs, and the most beautiful sunsets you'll ever witness.",
    reviews: [
      { user: "Priya N.", avatar: "P", text: "Honeymoon paradise. Absolutely breathtaking!", rating: 5, date: "2024-01-15" },
    ]
  },
  {
    id: 4, name: "New York", country: "USA", category: "city",
    image: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=600&q=80",
    description: "The city that never sleeps — energy, culture, ambition.",
    rating: 4.6, likes: 415, price: "$2100",
    tags: ["modern", "culture", "food", "shopping"],
    hotels: ["The Plaza", "Four Seasons NYC", "1 Hotel Brooklyn Bridge"],
    parks: ["Central Park", "High Line", "Brooklyn Bridge Park"],
    malls: ["Fifth Avenue", "Hudson Yards", "Brookfield Place"],
    restaurants: ["Eleven Madison Park", "Le Bernardin", "Carbone"],
    museums: ["MoMA", "Metropolitan Museum", "American Museum of Natural History"],
    whyVisit: "NYC is the world's cultural capital — Broadway shows, iconic skyline, diverse food scene, and neighborhoods each with their own unique personality.",
    reviews: [
      { user: "Omar A.", avatar: "O", text: "NYC's energy is unlike anything else. Love it!", rating: 4, date: "2024-02-10" },
      { user: "Zara H.", avatar: "Z", text: "Shopping heaven. Times Square at night is surreal.", rating: 5, date: "2024-01-30" },
    ]
  },
  {
    id: 5, name: "Santorini", country: "Greece", category: "beach",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    description: "Whitewashed domes, volcanic beaches, and Aegean sunsets.",
    rating: 4.8, likes: 378, price: "$2800",
    tags: ["romantic", "beach", "culture"],
    hotels: ["Canaves Oia", "Katikies Hotel", "Grace Santorini"],
    parks: ["Nea Kameni Volcano", "Akrotiri Archaeological Site", "Red Beach"],
    malls: ["Fira Shopping Street", "Oia Boutiques", "Perissa Market"],
    restaurants: ["Selene", "Lauda", "Ammoudi Fish Taverns"],
    museums: ["Museum of Prehistoric Thira", "Naval Maritime Museum", "Akrotiri"],
    whyVisit: "Santorini is Greece's crown jewel — dramatic cliffs, sapphire waters, iconic blue-domed churches, and the most photogenic sunsets on earth.",
    reviews: [
      { user: "Fatima S.", avatar: "F", text: "Perfect for couples. Sunsets here are unforgettable.", rating: 5, date: "2024-05-02" },
    ]
  },
  {
    id: 6, name: "Safari Kenya", country: "Kenya", category: "nature",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80",
    description: "The Great Migration, Big Five, and vast golden savannahs.",
    rating: 4.9, likes: 203, price: "$4200",
    tags: ["adventure", "nature", "wildlife"],
    hotels: ["Giraffe Manor", "Mahali Mzuri", "Angama Mara"],
    parks: ["Masai Mara", "Amboseli", "Tsavo National Park"],
    malls: ["Village Market Nairobi", "The Hub Karen", "Westgate Mall"],
    restaurants: ["Carnivore Restaurant", "Tamarind Mombasa", "Talisman"],
    museums: ["Nairobi National Museum", "Karen Blixen Museum", "Bomas of Kenya"],
    whyVisit: "Kenya offers the ultimate safari experience — witness millions of wildebeest migrate, spot lions at dawn, and sleep under a star-filled African sky.",
    reviews: [
      { user: "James T.", avatar: "J", text: "Life-changing experience. The wildlife is jaw-dropping.", rating: 5, date: "2024-03-18" },
    ]
  },
];

const categories = ["all", "city", "beach", "nature"];

const styles = `
${GOOGLE_FONT}
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
:root {
  --sand: #f5ede0;
  --deep: #1a0a00;
  --amber: #c8622a;
  --gold: #e8a838;
  --sky: #4a90b8;
  --white: #fdfaf6;
  --glass: rgba(255,255,255,0.08);
  --radius: 16px;
}
body { font-family:'DM Sans',sans-serif; background:var(--sand); color:var(--deep); }

/* NAV */
.nav {
  position:sticky; top:0; z-index:1000;
  background:rgba(26,10,0,0.95);
  backdrop-filter:blur(12px);
  padding:0 24px;
  display:flex; align-items:center; justify-content:space-between;
  height:64px; border-bottom:1px solid rgba(200,98,42,0.3);
}
.nav-logo { font-family:'Playfair Display',serif; font-size:1.4rem; color:var(--gold); letter-spacing:1px; }
.nav-logo span { color:var(--amber); font-style:italic; }
.nav-actions { display:flex; gap:10px; align-items:center; }
.btn { cursor:pointer; border:none; border-radius:8px; font-family:'DM Sans',sans-serif; font-weight:500; transition:all 0.2s; }
.btn-outline { background:transparent; border:1.5px solid var(--amber); color:var(--amber); padding:8px 16px; font-size:0.85rem; }
.btn-outline:hover { background:var(--amber); color:white; }
.btn-solid { background:var(--amber); color:white; padding:8px 18px; font-size:0.85rem; }
.btn-solid:hover { background:#b0541e; }
.btn-gold { background:linear-gradient(135deg,var(--gold),var(--amber)); color:white; padding:12px 28px; font-size:1rem; border-radius:10px; }
.btn-gold:hover { opacity:0.9; transform:translateY(-1px); }

/* HERO */
.hero {
  min-height:88vh;
  background: linear-gradient(160deg, #1a0a00 0%, #2d1a08 40%, #1a3a50 100%);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  text-align:center; padding:40px 20px; position:relative; overflow:hidden;
}
.hero::before {
  content:''; position:absolute; inset:0;
  background:url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=60') center/cover;
  opacity:0.15;
}
.hero-content { position:relative; z-index:1; max-width:700px; }
.hero-tag { display:inline-block; background:rgba(200,98,42,0.2); border:1px solid var(--amber); color:var(--gold); padding:6px 16px; border-radius:20px; font-size:0.8rem; letter-spacing:2px; text-transform:uppercase; margin-bottom:20px; }
.hero h1 { font-family:'Playfair Display',serif; font-size:clamp(2.4rem,6vw,4.5rem); color:white; line-height:1.15; margin-bottom:16px; }
.hero h1 em { color:var(--gold); font-style:italic; }
.hero p { color:rgba(255,255,255,0.7); font-size:1.1rem; line-height:1.6; margin-bottom:32px; max-width:500px; margin-left:auto; margin-right:auto; }
.hero-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.hero-stats { display:flex; gap:32px; justify-content:center; margin-top:48px; flex-wrap:wrap; }
.stat { text-align:center; }
.stat-num { font-family:'Playfair Display',serif; font-size:2rem; color:var(--gold); display:block; }
.stat-label { font-size:0.8rem; color:rgba(255,255,255,0.5); letter-spacing:1px; text-transform:uppercase; }

/* SEARCH */
.search-bar {
  background:white; border-radius:50px; padding:6px 6px 6px 20px;
  display:flex; align-items:center; gap:8px; box-shadow:0 4px 24px rgba(0,0,0,0.12);
  max-width:560px; width:100%; margin:0 auto;
}
.search-bar input { flex:1; border:none; outline:none; font-size:0.95rem; font-family:'DM Sans',sans-serif; color:var(--deep); background:transparent; }
.search-bar input::placeholder { color:#aaa; }
.search-btn { background:var(--amber); border:none; border-radius:40px; color:white; padding:10px 22px; cursor:pointer; font-size:0.9rem; font-family:'DM Sans',sans-serif; font-weight:500; }

/* MAIN SECTION */
.section { padding:64px 20px; max-width:1100px; margin:0 auto; }
.section-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:32px; gap:16px; flex-wrap:wrap; }
.section-title { font-family:'Playfair Display',serif; font-size:clamp(1.6rem,3vw,2.4rem); color:var(--deep); }
.section-title span { color:var(--amber); }

/* FILTERS */
.filters { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:28px; }
.filter-btn { background:white; border:1.5px solid #e0d8cf; color:#666; padding:8px 18px; border-radius:20px; cursor:pointer; font-size:0.85rem; font-family:'DM Sans',sans-serif; font-weight:500; transition:all 0.2s; }
.filter-btn.active, .filter-btn:hover { background:var(--amber); border-color:var(--amber); color:white; }

/* CARDS */
.cards-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:24px; }
.card {
  background:white; border-radius:var(--radius); overflow:hidden;
  box-shadow:0 2px 16px rgba(0,0,0,0.07); transition:all 0.3s; cursor:pointer;
  border:1px solid rgba(0,0,0,0.05);
}
.card:hover { transform:translateY(-6px); box-shadow:0 12px 40px rgba(0,0,0,0.15); }
.card-img { position:relative; height:200px; overflow:hidden; }
.card-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
.card:hover .card-img img { transform:scale(1.06); }
.card-price { position:absolute; top:12px; right:12px; background:rgba(26,10,0,0.85); color:var(--gold); padding:4px 12px; border-radius:20px; font-size:0.8rem; font-weight:600; }
.card-like { position:absolute; top:12px; left:12px; background:rgba(255,255,255,0.9); border:none; border-radius:50%; width:36px; height:36px; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
.card-like.liked { background:var(--amber); }
.card-body { padding:18px; }
.card-location { font-size:0.78rem; color:var(--amber); font-weight:600; letter-spacing:1px; text-transform:uppercase; margin-bottom:6px; }
.card-name { font-family:'Playfair Display',serif; font-size:1.25rem; margin-bottom:8px; }
.card-desc { font-size:0.85rem; color:#777; line-height:1.5; margin-bottom:12px; }
.card-footer { display:flex; align-items:center; justify-content:space-between; }
.card-rating { display:flex; align-items:center; gap:4px; font-size:0.85rem; font-weight:600; color:var(--deep); }
.card-likes { font-size:0.8rem; color:#aaa; }
.card-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; }
.tag { background:#f5ede0; color:var(--amber); padding:3px 10px; border-radius:20px; font-size:0.72rem; font-weight:500; }
/* MODAL OVERLAY */
.overlay {
  position:fixed; inset:0; z-index:2000;
  background:rgba(0,0,0,0.6); backdrop-filter:blur(4px);
  display:flex; align-items:center; justify-content:center; padding:16px;
}
.modal {
  background:white; border-radius:20px; width:100%; max-width:680px;
  max-height:90vh; overflow-y:auto; box-shadow:0 24px 80px rgba(0,0,0,0.3);
  animation:slideUp 0.3s ease;
}
@keyframes slideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
.modal-header {
  position:sticky; top:0; background:white; z-index:10;
  display:flex; align-items:center; justify-content:space-between;
  padding:20px 24px; border-bottom:1px solid #f0ebe4;
}
.modal-title { font-family:'Playfair Display',serif; font-size:1.4rem; }
.modal-close { background:none; border:none; font-size:1.5rem; cursor:pointer; color:#999; line-height:1; }
.modal-body { padding:24px; }

/* DETAIL MODAL */
.detail-hero { border-radius:12px; overflow:hidden; height:220px; margin-bottom:20px; }
.detail-hero img { width:100%; height:100%; object-fit:cover; }
.detail-meta { display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-bottom:16px; }
.detail-country { background:var(--amber); color:white; padding:4px 14px; border-radius:20px; font-size:0.8rem; font-weight:600; }
.detail-rating { font-size:0.9rem; font-weight:600; }
.detail-price { font-size:0.9rem; color:var(--sky); font-weight:600; }
.detail-section { margin-bottom:22px; }
.detail-section h4 { font-family:'Playfair Display',serif; font-size:1.05rem; color:var(--amber); margin-bottom:10px; padding-bottom:6px; border-bottom:1px solid #f0ebe4; }
.detail-list { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.detail-list-item { background:#faf7f3; border-radius:8px; padding:10px 12px; font-size:0.85rem; display:flex; align-items:center; gap:8px; }
.why-text { font-size:0.9rem; color:#555; line-height:1.7; background:#faf7f3; padding:14px; border-radius:10px; border-left:3px solid var(--amber); }

/* REVIEWS */
.reviews-section { margin-top:8px; }
.review-card { background:#faf7f3; border-radius:10px; padding:14px; margin-bottom:10px; }
.review-top { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
.review-avatar { width:36px; height:36px; border-radius:50%; background:var(--amber); color:white; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:0.9rem; flex-shrink:0; }
.review-name { font-weight:600; font-size:0.9rem; }
.review-date { font-size:0.75rem; color:#aaa; }
.review-stars { color:var(--gold); font-size:0.85rem; margin-left:auto; }
.review-text { font-size:0.85rem; color:#666; line-height:1.5; }
.add-review { margin-top:16px; background:#f5ede0; border-radius:12px; padding:16px; }
.add-review h5 { font-size:0.9rem; font-weight:600; margin-bottom:12px; }
.review-input { width:100%; border:1.5px solid #e0d8cf; border-radius:8px; padding:10px 12px; font-family:'DM Sans',sans-serif; font-size:0.85rem; resize:none; outline:none; }
.review-input:focus { border-color:var(--amber); }
.stars-select { display:flex; gap:4px; margin:10px 0; }
.star-btn { background:none; border:none; font-size:1.4rem; cursor:pointer; transition:transform 0.1s; }
.star-btn:hover { transform:scale(1.2); }

/* BOOKING MODAL */
.booking-form { display:flex; flex-direction:column; gap:14px; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.form-group { display:flex; flex-direction:column; gap:6px; }
.form-label { font-size:0.82rem; font-weight:600; color:var(--deep); }
.form-input { border:1.5px solid #e0d8cf; border-radius:8px; padding:10px 12px; font-family:'DM Sans',sans-serif; font-size:0.9rem; outline:none; transition:border 0.2s; }
.form-input:focus { border-color:var(--amber); }
.form-select { border:1.5px solid #e0d8cf; border-radius:8px; padding:10px 12px; font-family:'DM Sans',sans-serif; font-size:0.9rem; outline:none; background:white; cursor:pointer; }
.booking-summary { background:linear-gradient(135deg,var(--deep),#2d1a08); color:white; border-radius:12px; padding:16px; margin-top:4px; }
.booking-summary h5 { color:var(--gold); font-family:'Playfair Display',serif; margin-bottom:10px; }
.summary-row { display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px; opacity:0.8; }
.summary-total { display:flex; justify-content:space-between; font-weight:700; font-size:1rem; color:var(--gold); border-top:1px solid rgba(255,255,255,0.2); padding-top:10px; margin-top:4px; }
.flight-options { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:4px; }
.flight-opt { border:2px solid #e0d8cf; border-radius:10px; padding:10px 8px; text-align:center; cursor:pointer; transition:all 0.2s; }
.flight-opt.selected { border-color:var(--amber); background:#fff5ee; }
.flight-opt-name { font-size:0.8rem; font-weight:600; display:block; }
.flight-opt-price { font-size:0.75rem; color:var(--amber); display:block; margin-top:3px; }
.flight-opt-time { font-size:0.7rem; color:#aaa; display:block; }

/* LOGIN MODAL */
.login-form { display:flex; flex-direction:column; gap:14px; }
.login-hero-text { text-align:center; margin-bottom:8px; }
.login-hero-text h3 { font-family:'Playfair Display',serif; font-size:1.3rem; margin-bottom:4px; }
.login-hero-text p { font-size:0.85rem; color:#888; }
.divider { display:flex; align-items:center; gap:12px; color:#aaa; font-size:0.8rem; }
.divider::before, .divider::after { content:''; flex:1; height:1px; background:#e0d8cf; }
.social-btns { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.social-btn { border:1.5px solid #e0d8cf; background:white; border-radius:8px; padding:10px; cursor:pointer; font-size:0.85rem; font-family:'DM Sans',sans-serif; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.2s; }
.social-btn:hover { background:#f9f5f0; border-color:var(--amber); }

/* ADD DEST MODAL */
.add-form { display:flex; flex-direction:column; gap:12px; }
.form-textarea { border:1.5px solid #e0d8cf; border-radius:8px; padding:10px 12px; font-family:'DM Sans',sans-serif; font-size:0.9rem; outline:none; resize:none; min-height:80px; }
.form-textarea:focus { border-color:var(--amber); }

/* WHY VISIT SECTION */
.why-section { background:linear-gradient(135deg,#1a0a00 0%,#2d1a08 50%,#1a3a50 100%); padding:64px 20px; }
.why-cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:20px; margin-top:32px; max-width:1100px; margin-left:auto; margin-right:auto; }
.why-card { background:var(--glass); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius); padding:24px; text-align:center; color:white; transition:all 0.3s; }
.why-card:hover { background:rgba(200,98,42,0.15); border-color:var(--amber); transform:translateY(-4px); }
.why-icon { font-size:2.2rem; margin-bottom:12px; }
.why-card h4 { font-family:'Playfair Display',serif; margin-bottom:8px; font-size:1.1rem; color:var(--gold); }
.why-card p { font-size:0.82rem; color:rgba(255,255,255,0.65); line-height:1.6; }
.why-section .section-title { color:white; }
.why-section .section-title span { color:var(--gold); }
.why-section .sub { color:rgba(255,255,255,0.6); margin-top:8px; font-size:0.95rem; }

/* FOOTER */
.footer { background:var(--deep); color:rgba(255,255,255,0.5); text-align:center; padding:24px; font-size:0.82rem; }
.footer span { color:var(--gold); }

/* SUCCESS */
.success-banner { background:#e8f5e9; border:1.5px solid #66bb6a; color:#2e7d32; border-radius:10px; padding:12px 16px; font-size:0.9rem; display:flex; align-items:center; gap:8px; margin-bottom:16px; }

/* RESPONSIVE */
@media(max-width:600px){
  .form-row { grid-template-columns:1fr; }
  .flight-options { grid-template-columns:1fr; }
  .detail-list { grid-template-columns:1fr; }
  .info-grid { grid-template-columns:1fr; }
  .social-btns { grid-template-columns:1fr; }
}
`;

const sectionIcons = { hotels:"🏨", parks:"🌳", malls:"🛍️", restaurants:"🍽️", museums:"🏛️" };

export default function TravelSite() {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [likes, setLikes] = useState({});
  const [modal, setModal] = useState(null); // null | "detail" | "booking" | "login" | "add"
  const [selected, setSelected] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email:"", password:"" });
  const [addForm, setAddForm] = useState({ name:"", country:"", category:"city", description:"", price:"", image:"" });
  const [bookingForm, setBookingForm] = useState({ name:"", email:"", checkin:"", checkout:"", guests:"2", flight:"economy", hotel:"" });
  const [bookingDone, setBookingDone] = useState(false);
  const [newReview, setNewReview] = useState({ text:"", rating:5 });
  const [selectedFlight, setSelectedFlight] = useState("economy");
  const [reviewAdded, setReviewAdded] = useState(false);

  const filtered = destinations.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.category === filter;
    return matchSearch && matchFilter;
  });

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openDetail = (dest) => { setSelected(dest); setModal("detail"); setReviewAdded(false); };
  const openBooking = (dest) => { setSelected(dest); setModal("booking"); setBookingDone(false); };
  const closeModal = () => { setModal(null); };

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) { setLoggedIn(true); closeModal(); }
  };

  const handleAddDestination = () => {
    if (!addForm.name || !addForm.country) return;
    const newDest = {
      id: Date.now(), ...addForm,
      image: addForm.image || `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80`,
      rating: 4.5, likes: 0, tags: [addForm.category],
      hotels:[], parks:[], malls:[], restaurants:[], museums:[],
      whyVisit:`Discover the beauty of ${addForm.name}, ${addForm.country}.`,
      reviews:[]
    };
    setDestinations(prev => [newDest, ...prev]);
    setAddForm({ name:"", country:"", category:"city", description:"", price:"", image:"" });
    closeModal();
  };

  const handleBooking = () => { setBookingDone(true); };
  const submitReview = () => {
    if (!newReview.text) return;
    const review = {
      user: loggedIn ? loginForm.email.split("@")[0] : "Guest",
      avatar: (loggedIn ? loginForm.email[0] : "G").toUpperCase(),
      text: newReview.text, rating: newReview.rating,
      date: new Date().toISOString().split("T")[0]
    };
    setDestinations(prev => prev.map(d =>
      d.id === selected.id ? { ...d, reviews: [...d.reviews, review] } : d
    ));
    setSelected(prev => ({ ...prev, reviews: [...prev.reviews, review] }));
    setNewReview({ text:"", rating:5 });
    setReviewAdded(true);
    setTimeout(() => setReviewAdded(false), 3000);
  };

  const nights = bookingForm.checkin && bookingForm.checkout
    ? Math.max(1, Math.round((new Date(bookingForm.checkout) - new Date(bookingForm.checkin)) / 86400000))
    : 3;
  const flightPrices = { economy:299, business:799, first:1499 };
  const hotelNight = 180;
  const total = selected ? (flightPrices[selectedFlight] + hotelNight * nights) * parseInt(bookingForm.guests||1) : 0;

  return (
    <>
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-logo">Wander<span>Lust</span></div>
        <div className="nav-actions">
          {loggedIn
            ? <span style={{color:"#e8a838",fontSize:"0.85rem"}}>👤 {loginForm.email.split("@")[0]}</span>
            : <button className="btn btn-outline" onClick={() => setModal("login")}>Login</button>
          }
          <button className="btn btn-solid" onClick={() => loggedIn ? setModal("add") : setModal("login")}>+ Add Place</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">✈️ Explore the World</div>
          <h1>Discover Your Next <em>Adventure</em></h1>
          <p>From bustling cities to hidden beaches — find, explore, and book your dream destination.</p>
          <div className="search-bar" style={{marginBottom:"24px"}}>
            <span>🔍</span>
            <input
              placeholder="Search cities, countries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>
          <div className="hero-btns">
            <button className="btn btn-gold" onClick={() => document.getElementById('explore').scrollIntoView({behavior:'smooth'})}>Explore Destinations</button>
            <button className="btn btn-outline" style={{color:"white",borderColor:"rgba(255,255,255,0.4)"}} onClick={() => setModal("login")}>Plan a Trip</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">50+</span><span className="stat-label">Destinations</span></div>
          <div className="stat"><span className="stat-num">12K+</span><span className="stat-label">Happy Travelers</span></div>
          <div className="stat"><span className="stat-num">4.9★</span><span className="stat-label">Avg Rating</span></div>
        </div>
      </section>

      {/* WHY VISIT SECTION */}
      <section className="why-section">
        <div style={{maxWidth:"1100px",margin:"0 auto",textAlign:"center"}}>
          <div className="section-title">Why Travel With <span>WanderLust?</span></div>
          <p className="sub">Everything you need for the perfect journey</p>
        </div>
        <div className="why-cards">
          {[
            {icon:"🌍", title:"Hand-Picked Destinations", desc:"Every destination is curated by our expert travel editors for authentic experiences."},
            {icon:"💰", title:"Best Price Guarantee", desc:"We match any price. Book with confidence knowing you're getting the best deal."},
            {icon:"🏨", title:"Luxury Hotels", desc:"Partner hotels with exclusive perks — early check-in, upgrades, and free breakfast."},
            {icon:"🛡️", title:"Travel Insurance", desc:"24/7 support and full insurance coverage for every trip booked on WanderLust."},
            {icon:"✈️", title:"Flight Booking", desc:"Economy, business, or first class — compare flights and book in minutes."},
            {icon:"📍", title:"Local Experiences", desc:"Authentic tours, restaurant reservations, and hidden gems only locals know."},
          ].map((w,i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{w.icon}</div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section" id="explore">
        <div className="section-header">
          <div>
            <div className="section-title">Top <span>Destinations</span></div>
            <p style={{color:"#888",marginTop:"4px",fontSize:"0.9rem"}}>{filtered.length} places found</p>
          </div>
        </div>
        <div className="filters">
          {categories.map(c => (
            <button key={c} className={`filter-btn ${filter===c?"active":""}`} onClick={() => setFilter(c)}>
              {c === "all" ? "🌐 All" : c === "city" ? "🏙️ Cities" : c === "beach" ? "🏖️ Beaches" : "🌿 Nature"}
            </button>
          ))}
        </div>
        <div className="cards-grid">
          {filtered.map(dest => (
            <div className="card" key={dest.id} onClick={() => openDetail(dest)}>
              <div className="card-img">
                <img src={dest.image} alt={dest.name} loading="lazy" />
                <div className="card-price">{dest.price}</div>
                <button className={`card-like ${likes[dest.id]?"liked":""}`} onClick={e => toggleLike(dest.id, e)}>
                  {likes[dest.id] ? "❤️" : "🤍"}
                </button>
              </div>
              <div className="card-body">
                <div className="card-location">{dest.country} · {dest.category}</div>
                <div className="card-name">{dest.name}</div>
                <div className="card-desc">{dest.description}</div>
                <div className="card-tags">{dest.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <div className="card-footer">
                  <div className="card-rating">⭐ {dest.rating}</div>
                  <div className="card-likes">❤️ {dest.likes + (likes[dest.id] ? 1 : 0)}</div>
                  <button className="btn btn-solid" style={{padding:"6px 14px",fontSize:"0.8rem"}}
                    onClick={e => { e.stopPropagation(); openBooking(dest); }}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px",color:"#aaa"}}>
              <div style={{fontSize:"3rem"}}>🔍</div>
              <p>No destinations found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 <span>WanderLust</span> — Made with ❤️ for travelers everywhere</p>
      </footer>

      {/* ===== MODALS ===== */}

      {/* DETAIL MODAL */}
      {modal === "detail" && selected && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{selected.name}</div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-hero"><img src={selected.image} alt={selected.name} /></div>
              <div className="detail-meta">
                <span className="detail-country">{selected.country}</span>
                <span className="detail-rating">⭐ {selected.rating}</span>
                <span className="detail-price">✈️ From {selected.price}</span>
                <button className="btn btn-gold" style={{marginLeft:"auto",padding:"8px 18px",fontSize:"0.85rem"}}
                  onClick={() => openBooking(selected)}>Book This Trip</button>
              </div>

              {/* Why Visit */}
              <div className="detail-section">
                <h4>🌟 Why Visit</h4>
                <div className="why-text">{selected.whyVisit}</div>
              </div>

              {/* Hotels, Parks, Malls, Restaurants, Museums */}
              {["hotels","parks","malls","restaurants","museums"].map(sec => (
                selected[sec]?.length > 0 && (
                  <div className="detail-section" key={sec}>
                    <h4>{sectionIcons[sec]} {sec.charAt(0).toUpperCase()+sec.slice(1)}</h4>
                    <div className="detail-list">
                      {selected[sec].map((item,i) => (
                        <div className="detail-list-item" key={i}>{sectionIcons[sec]} {item}</div>
                      ))}
                    </div>
                  </div>
                )
              ))}

              {/* Reviews */}
              <div className="detail-section reviews-section">
                <h4>💬 Reviews ({selected.reviews.length})</h4>
                {selected.reviews.map((r,i) => (
                  <div className="review-card" key={i}>
                    <div className="review-top">
                      <div className="review-avatar">{r.avatar}</div>
                      <div>
                        <div className="review-name">{r.user}</div>
                        <div className="review-date">{r.date}</div>
                      </div>
                      <div className="review-stars">{"⭐".repeat(r.rating)}</div>
                    </div>
                    <div className="review-text">{r.text}</div>
                  </div>
                ))}

                {/* Add Review */}
                <div className="add-review">
                  <h5>✍️ Write a Review</h5>
                  {reviewAdded && <div className="success-banner">✅ Review added! Thank you.</div>}
                  <div className="stars-select">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} className="star-btn" onClick={() => setNewReview(p=>({...p,rating:s}))}>
                        {s <= newReview.rating ? "⭐" : "☆"}
                      </button>
                    ))}
                  </div>
                  <textarea className="review-input" rows={3}
                    placeholder="Share your experience..."
                    value={newReview.text}
                    onChange={e => setNewReview(p=>({...p,text:e.target.value}))}
                  />
                  <button className="btn btn-gold" style={{marginTop:"10px",width:"100%"}} onClick={submitReview}>
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <button className="social-btn">🌐 Google</button>
      {/* BOOKING MODAL */}
      {modal === "booking" && selected && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">✈️ Book — {selected?.name}</div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              {bookingDone ? (
                <div style={{textAlign:"center",padding:"32px 16px"}}>
                  <div style={{fontSize:"4rem",marginBottom:"16px"}}>🎉</div>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",marginBottom:"8px"}}>Booking Confirmed!</h3>
                  <p style={{color:"#888",marginBottom:"20px"}}>Your trip to <b>{selected.name}</b> is booked. Check your email for details.</p>
                  <div className="booking-summary">
                    <h5>Booking Summary</h5>
                    <div className="summary-row"><span>Destination</span><span>{selected.name}, {selected.country}</span></div>
                    <div className="summary-row"><span>Guests</span><span>{bookingForm.guests}</span></div>
                    <div className="summary-row"><span>Check-in</span><span>{bookingForm.checkin || "TBD"}</span></div>
                    <div className="summary-row"><span>Check-out</span><span>{bookingForm.checkout || "TBD"}</span></div>
                    <div className="summary-row"><span>Flight</span><span>{selectedFlight}</span></div>
                    <div className="summary-total"><span>Total</span><span>${total.toLocaleString()}</span></div>
                  </div>
                  <button className="btn btn-gold" style={{marginTop:"20px",width:"100%"}} onClick={closeModal}>Done</button>
                </div>
              ) : (
                <div className="booking-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" placeholder="Your name"
                        value={bookingForm.name} onChange={e => setBookingForm(p=>({...p,name:e.target.value}))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" placeholder="email@example.com" type="email"
                        value={bookingForm.email} onChange={e => setBookingForm(p=>({...p,email:e.target.value}))} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Check-in Date</label>
                      <input className="form-input" type="date"
                        value={bookingForm.checkin} onChange={e => setBookingForm(p=>({...p,checkin:e.target.value}))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Check-out Date</label>
                      <input className="form-input" type="date"
                        value={bookingForm.checkout} onChange={e => setBookingForm(p=>({...p,checkout:e.target.value}))} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Guests</label>
                      <select className="form-select" value={bookingForm.guests} onChange={e => setBookingForm(p=>({...p,guests:e.target.value}))}>
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Hotel</label>
                      <select className="form-select" value={bookingForm.hotel} onChange={e => setBookingForm(p=>({...p,hotel:e.target.value}))}>
                        <option value="">Select Hotel</option>
                        {selected.hotels.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">✈️ Choose Flight Class</label>
                    <div className="flight-options">
                      {[{id:"economy",name:"Economy",price:"$299",time:"Best Value"},
                        {id:"business",name:"Business",price:"$799",time:"Extra Comfort"},
                        {id:"first",name:"First Class",price:"$1499",time:"Ultimate Luxury"}
                      ].map(f => (
                        <div key={f.id} className={`flight-opt ${selectedFlight===f.id?"selected":""}`}
                          onClick={() => setSelectedFlight(f.id)}>
                          <span className="flight-opt-name">{f.name}</span>
                          <span className="flight-opt-price">{f.price}</span>
                          <span className="flight-opt-time">{f.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="booking-summary">
                    <h5>Price Summary</h5>
                    <div className="summary-row"><span>Flight ({selectedFlight})</span><span>${flightPrices[selectedFlight]} × {bookingForm.guests||1}</span></div>
                    <div className="summary-row"><span>Hotel ({nights} nights)</span><span>${hotelNight} × {nights} × {bookingForm.guests||1}</span></div>
                    <div className="summary-total"><span>Total</span><span>${total.toLocaleString()}</span></div>
                  </div>

                  <button className="btn btn-gold" style={{width:"100%"}} onClick={handleBooking}>
                    Confirm Booking — ${total.toLocaleString()}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {modal === "login" && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" style={{maxWidth:"420px"}} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Welcome Back</div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="login-hero-text">
                <h3>Sign in to WanderLust ✈️</h3>
                <p>Plan trips, save favorites, and write reviews</p>
              </div>
              <div className="social-btns" style={{marginBottom:"16px"}}>
                <button className="social-btn">📘 Facebook</button>
              </div>
              <div className="divider">or continue with email</div>
              <div className="login-form" style={{marginTop:"16px"}}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="your@email.com"
                    value={loginForm.email} onChange={e => setLoginForm(p=>({...p,email:e.target.value}))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input className="form-input" type="password" placeholder="••••••••"
                    value={loginForm.password} onChange={e => setLoginForm(p=>({...p,password:e.target.value}))} />
                </div>
                <button className="btn btn-gold" style={{width:"100%"}} onClick={handleLogin}>Sign In</button>
                <p style={{textAlign:"center",fontSize:"0.82rem",color:"#aaa"}}>
                  Don't have an account? <span style={{color:"var(--amber)",cursor:"pointer"}}>Sign up free</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD DESTINATION MODAL */}
      {modal === "add" && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" style={{maxWidth:"480px"}} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">🌍 Add Destination</div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="add-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Destination Name *</label>
                    <input className="form-input" placeholder="e.g. Barcelona"
                      value={addForm.name} onChange={e => setAddForm(p=>({...p,name:e.target.value}))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country *</label>
                    <input className="form-input" placeholder="e.g. Spain"
                      value={addForm.country} onChange={e => setAddForm(p=>({...p,country:e.target.value}))} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={addForm.category} onChange={e => setAddForm(p=>({...p,category:e.target.value}))}>
                      <option value="city">City</option>
                      <option value="beach">Beach</option>
                      <option value="nature">Nature</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Avg Price</label>
                    <input className="form-input" placeholder="e.g. $1500"
                      value={addForm.price} onChange={e => setAddForm(p=>({...p,price:e.target.value}))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" placeholder="Describe this destination..."
                    value={addForm.description} onChange={e => setAddForm(p=>({...p,description:e.target.value}))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Image URL (optional)</label>
                  <input className="form-input" placeholder="https://..."
                    value={addForm.image} onChange={e => setAddForm(p=>({...p,image:e.target.value}))} />
                </div>
                <button className="btn btn-gold" style={{width:"100%"}} onClick={handleAddDestination}>
                  Add Destination 🌍
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
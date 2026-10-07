const data = {
  hot: {
    image: "assets/menu-hot-cold.png",
    alt: "Hot drinks menu",
    items: [
      {cat:"COFFEE", name:"Americano", price:"1.75"},
      {name:"American Coffee", price:"2.00"},
      {name:"Double Espresso", price:"1.50"},
      {name:"Macchiato", price:"2.25"},
      {name:"Cortado", price:"2.25"},
      {name:"Cappuccino", price:"2.50"},
      {name:"Flat White", price:"2.50"},
      {name:"Latte", price:"2.50"},
      {name:"White Mocha", price:"3.00"},
      {name:"Dark Mocha", price:"3.00"},
      {name:"Turkish Coffee — Small", price:"1.50"},
      {name:"Turkish Coffee — Large", price:"2.00"},
      {cat:"FLAVOURED LATTES", name:"Caramel Macchiato", price:"3.00"},
      {name:"Spanish Latte", price:"3.00"},
      {name:"Caramel Latte", price:"3.00"},
      {name:"Vanilla Latte", price:"3.00"},
      {name:"Hazelnut Latte", price:"3.00"},
      {name:"Salted Caramel Latte", price:"3.00"},
      {cat:"TEA & HERBS", name:"Hot Chocolate", price:"2.50"},
      {name:"Sahlab", price:"2.50"},
      {name:"Tea — Small", price:"1.25"},
      {name:"Tea — Large", price:"1.50"},
      {name:"Tea with Milk", price:"1.50"},
      {name:"Herbs", price:"1.25", note:"Aniseed, Camomile, Ginger & Honey, Ginger & Lemon, Green Tea, Green Tea & Mint"}
    ]
  },
  cold: {
    image: "assets/menu-cold-drinks.jpeg",
    alt: "Cold drinks menu",
    items: [
      {cat:"ICED COFFEE", name:"Iced Americano", price:"1.75"},
      {name:"Iced Latte", price:"2.50"},
      {name:"Iced Spanish Latte", price:"3.00"},
      {name:"Iced Caramel Latte", price:"3.00"},
      {name:"Iced Vanilla Latte", price:"3.00"},
      {name:"Iced Hazelnut Latte", price:"3.00"},
      {name:"Iced Salted Caramel Latte", price:"3.00"},
      {name:"Iced Caramel Macchiato", price:"3.00"},
      {name:"Iced White Mocha", price:"3.00"},
      {name:"Iced Dark Mocha", price:"3.00"},
      {name:"Caramel Frappe", price:"3.25"},
      {name:"Mocha Frappe", price:"3.25"},
      {cat:"REFRESHERS", name:"Mojito", price:"2.50", note:"Grenadine, Mango, Strawberry, Peach, Passion, Mango & Passion"},
      {name:"Iced Tea", price:"2.50"},
      {name:"Smoothie", price:"3.00"},
      {name:"Milkshake", price:"3.25"},
      {cat:"SOFT & ENERGY", name:"Cola", price:"1.25"},
      {name:"G", price:"1.50"},
      {name:"Boom Boom", price:"2.00"},
      {name:"Cold Red", price:"2.50"},
      {cat:"WATER", name:"Water Bottle", price:"0.25"},
      {name:"Sparkling Water", price:"1.50"}
    ]
  },
  fresh: {
    image: "assets/menu-juices.jpeg",
    alt: "Fresh juices and desserts",
    items: [
      {cat:"FRESH JUICES", name:"Orange Juice", price:"M 2.00 · L 3.00"},
      {name:"Lemon Juice", price:"M 2.00 · L 3.00"},
      {name:"Lemon & Mint Juice", price:"M 2.00 · L 3.00"},
      {name:"Banana & Milk Juice", price:"2.00"},
      {name:"Banana, Strawberry & Milk Juice", price:"2.25"},
      {cat:"DESSERTS", name:"Cheese Cake", price:"2.50"},
      {name:"Tiramisu", price:"2.50"},
      {name:"Lazy Cake", price:"2.00"},
      {name:"Hand-made Cookies", price:"", note:"Chocolate 1.25 · Walnut 1.50 · Lotus 1.75"}
    ]
  },
  snacks: {
    image: "assets/menu-sandwiches.jpeg",
    alt: "Sandwiches and snacks",
    items: [
      {cat:"SANDWICHES", name:"Halloumi Sandwich", price:"1.50"},
      {name:"Turkey Sandwich", price:"1.50"},
      {name:"Halloumi & Za’atar Rolls", price:"1.00"},
      {cat:"SNACKS", name:"Long Salty Sticks", price:"0.75"},
      {name:"Popcorn Bucket", price:"0.75"},
      {name:"Snack Mix", price:"0.75"}
    ]
  }
};

const list = document.querySelector("#menuList");
const image = document.querySelector("#menuImage");
const index = document.querySelector("#menuIndex");

function render(category){
  const d = data[category];
  image.style.opacity = "0";
  setTimeout(() => {
    image.src = d.image;
    image.alt = d.alt;
    image.style.opacity = "1";
  }, 120);
  const categories = {hot:"01", cold:"02", fresh:"03", snacks:"04"};
  index.textContent = `${categories[category]} / 04`;
  list.innerHTML = "";
  let html = "";
  d.items.forEach(item => {
    if(item.cat) html += `<div class="menu-category">${item.cat}</div>`;
    html += `<div class="menu-row"><strong>${item.name}</strong><span>${item.price}</span>${item.note ? `<small>${item.note}</small>` : ""}</div>`;
  });
  list.innerHTML = html;
}

document.querySelectorAll(".menu-tabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".menu-tabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.category);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const progress = document.querySelector(".progress span");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
},{passive:true});

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click",()=>nav.classList.remove("open")));

render("hot");

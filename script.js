// Menu Database
const menuData = {
    coffee: [
        { id: 1, name: "Signature Pour-Over", price: 240, desc: "Single-origin beans brewed fresh with precision drippers.", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400" },
        { id: 2, name: "Velvet Flat White", price: 280, desc: "Double ristretto shot with micro-foamed organic milk.", img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "Spanish Latte", price: 320, desc: "Espresso with textured milk and a touch of condensed sweetness.", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400" }
    ],
    bakery: [
        { id: 4, name: "Almond Sourdough Croissant", price: 220, desc: "Flaky, buttery pastry filled with rich almond frangipane.", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400" },
        { id: 5, name: "Artisan Pain au Chocolat", price: 200, desc: "Wrapped with premium Belgian dark chocolate batons.", img: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=400" },
        { id: 6, name: "Blueberry Sourdough Muffin", price: 180, desc: "Packed with organic mountain blueberries and crunchy crumble.", img: "https://images.unsplash.com/photo-1607958996333-41aef7caefcc?auto=format&fit=crop&q=80&w=400" }
    ],
    brunch: [
        { id: 7, name: "Avocado Sourdough Toast", price: 380, desc: "Mashed avocado, poached organic eggs, chili flakes, microgreens.", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400" },
        { id: 8, name: "Fluffy Brioche French Toast", price: 350, desc: "Served with maple syrup, fresh berries, and mascarpone cream.", img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=400" }
    ],
    signature: [
        { id: 9, name: "Iced Honey Lavender Latte", price: 340, desc: "Espresso, cold milk, organic lavender infusion, and wild honey.", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400" },
        { id: 10, name: "Spiced Chai Cold Brew", price: 290, desc: "Slow-steeped cold brew infused with whole Indian spices.", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400" }
    ]
};

let cart = [];

// Initialize Lucide icons on load
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    filterMenu('coffee');
});

// Filter Menu Categories
function filterMenu(category) {
    const tabs = document.querySelectorAll('.menu-tab');
    tabs.forEach(tab => {
        tab.classList.remove('bg-[#3D2C24]', 'text-white', 'shadow-sm');
        tab.classList.add('bg-white', 'text-[#5C4A42]');
    });
    
    event.currentTarget.classList.remove('bg-white', 'text-[#5C4A42]');
    event.currentTarget.classList.add('bg-[#3D2C24]', 'text-white', 'shadow-sm');

    const container = document.getElementById('menu-container');
    const items = menuData[category] || [];
    
    container.innerHTML = items.map(item => `
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E6DFD5] flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
                <div class="h-48 overflow-hidden relative">
                    <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#3D2C24] font-bold text-sm px-3 py-1 rounded-full shadow-sm">₹${item.price}</span>
                </div>
                <div class="p-6 space-y-2">
                    <h3 class="font-serif font-bold text-xl text-[#3D2C24]">${item.name}</h3>
                    <p class="text-sm text-[#6C5A52] leading-relaxed">${item.desc}</p>
                </div>
            </div>
            <div class="p-6 pt-0">
                <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})" class="w-full py-3 rounded-xl bg-[#FAF7F2] text-[#3D2C24] font-bold text-sm border border-[#E6DFD5] hover:bg-[#3D2C24] hover:text-white transition-all flex items-center justify-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add to Order
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Cart Functions
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    updateCartUI();
    toggleCartDrawer(true);
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (totalCount > 0) {
        badge.textContent = totalCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-center text-sm text-[#8C7A70] py-8">Your cart is currently empty.</p>`;
    } else {
        container.innerHTML = cart.map(item => `
            py-4 flex items-center justify-between
            <div class="py-4 flex items-center justify-between">
                <div>
                    <h4 class="font-bold text-sm text-[#3D2C24]">${item.name}</h4>
                    <span class="text-xs text-[#8C7A70]">₹${item.price} × ${item.qty}</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-bold text-sm text-[#3D2C24]">₹${item.price * item.qty}</span>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 text-xs font-bold p-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    }

    totalEl.textContent = `₹${totalPrice}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function toggleCartDrawer(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    if (forceOpen) {
        drawer.classList.remove('hidden');
    } else {
        drawer.classList.toggle('hidden');
    }
}

function checkoutOrder() {
    if (cart.length === 0) return alert('Your cart is empty!');
    showModal('Order Placed Successfully!', 'Thank you for your order! Your freshly prepared items will be ready at the counter in 15 minutes.');
    cart = [];
    updateCartUI();
    toggleCartDrawer();
}

// Reservation Handler
function handleReservation(event) {
    event.preventDefault();
    const name = document.getElementById('res-name').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;

    showModal('Table Reserved Successfully!', `Thank you ${name}! We have secured your table for ${guests} on ${date} at ${time}. We look forward to hosting you.`);
    document.getElementById('reservation-form').reset();
}

// Modal Helpers
function showModal(title, desc) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = desc;
    document.getElementById('success-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('success-modal').classList.add('hidden');
}
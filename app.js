// Product data
const products = [
    {
        id: 1,
        name: 'Elegant Silk Blouse',
        price: 129.99,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
        id: 2,
        name: 'Classic Denim Jacket',
        price: 89.50,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
        id: 3,
        name: 'Summer Linen Dress',
        price: 149.99,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1596993100471-c3905dafa78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
        id: 4,
        name: 'Leather Crossbody Bag',
        price: 199.00,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
    },
    {
        id: 5,
        name: 'Casual Cotton Shirt',
        price: 45.99,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80'
    },
    {
        id: 6,
        name: 'Designer Sunglasses',
        price: 159.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'
    },
    {
        id: 7,
        name: 'Floral Maxi Dress',
        price: 79.99,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=746&q=80'
    },
    {
        id: 8,
        name: 'Leather Wallet',
        price: 49.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    }
];

// Wishlist management
let wishlist = [];
let currentFilters = {
    category: 'all',
    price: 'all',
    sort: 'featured'
};

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const wishlistGrid = document.querySelector('.wishlist-grid');
const wishlistCount = document.querySelector('.wishlist-count');

// Filter products
function filterProducts() {
    let filteredProducts = [...products];

    // Apply category filter
    if (currentFilters.category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentFilters.category
        );
    }

    // Apply price filter
    if (currentFilters.price !== 'all') {
        const [min, max] = currentFilters.price.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price < max;
            } else {
                return product.price >= min;
            }
        });
    }

    // Apply sorting
    switch (currentFilters.sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // 'featured' - keep original order
            break;
    }

    return filteredProducts;
}

// Render Products
function renderProducts() {
    const filteredProducts = filterProducts();
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="add-to-cart">Add to Cart</button>
                    <button class="add-to-wishlist" onclick="addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Wishlist
function renderWishlist() {
    wishlistGrid.innerHTML = wishlist.map(product => `
        <div class="wishlist-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <div class="wishlist-details">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
            <div class="wishlist-actions">
                <button class="remove-from-wishlist" onclick="removeFromWishlist(${product.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');

    // Update wishlist count
    wishlistCount.textContent = wishlist.length;
}

// Add to Wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in wishlist
    if (!wishlist.some(p => p.id === productId)) {
        wishlist.push(product);
        renderWishlist();
    }
}

// Remove from Wishlist
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(p => p.id !== productId);
    renderWishlist();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderWishlist();

    // Filter change handlers
    document.getElementById('category-filter').addEventListener('change', (e) => {
        currentFilters.category = e.target.value;
        renderProducts();
    });

    document.getElementById('price-filter').addEventListener('change', (e) => {
        currentFilters.price = e.target.value;
        renderProducts();
    });

    document.getElementById('sort-filter').addEventListener('change', (e) => {
        currentFilters.sort = e.target.value;
        renderProducts();
    });

    // Add to cart handler
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.closest('.product-card').dataset.id);
            const product = products.find(p => p.id === productId);
            alert(`Added ${product.name} to cart!`);
        }
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        newsletterForm.reset();
    });

    // Category card click handling
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            document.getElementById('category-filter').value = category.toLowerCase().replace("'s fashion", "");
            currentFilters.category = document.getElementById('category-filter').value;
            renderProducts();
            document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

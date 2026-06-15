// ===== GSAP REGISTRATION =====
gsap.registerPlugin(ScrollTrigger);

// ===== GLOBAL STATE =====
let cart = JSON.parse(localStorage.getItem('auralisCart')) || [];
let currentFilter = 'all';

// ===== LUXURY PRODUCTS DATABASE =====
const luxuryProducts = [
  {
    id: 1,
    name: 'L\'ESSENCE ROYALE',
    category: 'women',
    price: 850,
    description: 'The essence of timeless elegance',
    emoji: '🌹'
  },
  {
    id: 2,
    name: 'OBSIDIAN NOIR',
    category: 'men',
    price: 950,
    description: 'Dark, mysterious, unforgettable',
    emoji: '🌑'
  },
  {
    id: 3,
    name: 'GOLDEN AURA',
    category: 'unisex',
    price: 750,
    description: 'Radiant luxury in every drop',
    emoji: '✨'
  },
  {
    id: 4,
    name: 'MIDNIGHT WHISPER',
    category: 'women',
    price: 920,
    description: 'Secrets wrapped in silk and secrets',
    emoji: '🌙'
  },
  {
    id: 5,
    name: 'VELOCITY ELITE',
    category: 'men',
    price: 880,
    description: 'Intense and commanding presence',
    emoji: '⚡'
  },
  {
    id: 6,
    name: 'CELESTIAL MIST',
    category: 'unisex',
    price: 800,
    description: 'Ethereal fragrance from the stars',
    emoji: '🌌'
  },
  {
    id: 7,
    name: 'ROSE CATHEDRAL',
    category: 'women',
    price: 1050,
    description: 'Sacred beauty in a bottle',
    emoji: '🏛️'
  },
  {
    id: 8,
    name: 'IRON DYNASTY',
    category: 'men',
    price: 975,
    description: 'Power, prestige, and legacy',
    emoji: '👑'
  },
  {
    id: 9,
    name: 'AURORA BOREALIS',
    category: 'unisex',
    price: 850,
    description: 'Dancing lights of luxury',
    emoji: '🌌'
  }
];

// ===== LOADING SCREEN =====
function setupLoadingScreen() {
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          loadingScreen.style.display = 'none';
        }
      });
    }, 1800);
  });
}

// ===== FLOATING PARTICLES =====
function createFloatingParticles() {
  const container = document.getElementById('particleContainer');
  const particleCount = window.innerWidth > 768 ? 50 : 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(212, 175, 55, 0.5)`;

    container.appendChild(particle);

    // Animate particles
    gsap.to(particle, {
      duration: Math.random() * 30 + 20,
      y: Math.random() * 200 - 100,
      x: Math.random() * 200 - 100,
      opacity: Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}

// ===== THREE.JS 3D PERFUME BOTTLE =====
function initializePerfumeBottle() {
  const canvas = document.getElementById('perfumeCanvas');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0.1);
  camera.position.z = 3;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xd4af37, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0x4dd0ff, 0.3);
  pointLight2.position.set(-5, -5, 5);
  scene.add(pointLight2);

  // Bottle Group
  const bottleGroup = new THREE.Group();
  scene.add(bottleGroup);

  // Create bottle cap
  const capGeometry = new THREE.CylinderGeometry(0.3, 0.35, 0.2, 32);
  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 1,
    roughness: 0.2
  });
  const cap = new THREE.Mesh(capGeometry, capMaterial);
  cap.position.y = 1.3;
  bottleGroup.add(cap);

  // Create bottle neck
  const neckGeometry = new THREE.CylinderGeometry(0.25, 0.35, 0.4, 32);
  const neckMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    metalness: 0.4,
    roughness: 0.6,
    transparent: true,
    opacity: 0.8
  });
  const neck = new THREE.Mesh(neckGeometry, neckMaterial);
  neck.position.y = 0.8;
  bottleGroup.add(neck);

  // Create main bottle body
  const bodyGeometry = new THREE.SphereGeometry(0.6, 64, 64);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    metalness: 0.8,
    roughness: 0.2,
    envMap: createGradientTexture()
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.scale.set(1, 1.3, 1);
  bottleGroup.add(body);

  // Create inner liquid
  const liquidGeometry = new THREE.SphereGeometry(0.55, 64, 64);
  const liquidMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.3,
    transparent: true,
    opacity: 0.5
  });
  const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
  liquid.scale.set(0.98, 0.95, 0.98);
  liquid.position.z = 0.01;
  bottleGroup.add(liquid);

  // Mouse tracking
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotation
    bottleGroup.rotation.y += 0.01;
    bottleGroup.rotation.z = mouseY * 0.3;
    bottleGroup.rotation.x = mouseX * 0.3;

    // Floating motion
    bottleGroup.position.y = Math.sin(Date.now() * 0.0005) * 0.3;

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

function createGradientTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 180);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.5, '#d4af37');
  gradient.addColorStop(1, '#000000');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ===== PRODUCT RENDERING =====
function renderProducts(filter = 'all') {
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = '';

  let filteredProducts = luxuryProducts;
  if (filter !== 'all') {
    filteredProducts = luxuryProducts.filter(p => p.category === filter);
  }

  filteredProducts.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <div class="product-image">
        <span>${product.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category.toUpperCase()}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price}</span>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">ADD TO CART</button>
        </div>
      </div>
    `;

    // Stagger animation
    gsap.from(productCard, {
      duration: 0.6,
      opacity: 0,
      y: 50,
      delay: index * 0.05,
      ease: 'power2.out'
    });

    productsGrid.appendChild(productCard);
  });
}

// ===== CART FUNCTIONALITY =====
function addToCart(productId) {
  const product = luxuryProducts.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  showCartNotification();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('auralisCart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.getElementById('cartItems');
  const subtotal = document.getElementById('subtotal');
  const total = document.getElementById('total');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    subtotal.textContent = '$0';
    total.textContent = '$0';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price} × ${item.quantity}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
    </div>
  `).join('');

  const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 50 : 0;
  const totalAmount = subtotalAmount + shipping;

  subtotal.textContent = `$${subtotalAmount}`;
  document.getElementById('shipping').textContent = `$${shipping}`;
  total.textContent = `$${totalAmount}`;
}

function showCartNotification() {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #d4af37, #e6d5a8);
    color: #000;
    padding: 15px 25px;
    border-radius: 50px;
    font-weight: 600;
    z-index: 1000;
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  `;
  notification.textContent = '✓ Added to luxury collection';

  document.body.appendChild(notification);

  gsap.to(notification, {
    duration: 3,
    opacity: 0,
    y: -20,
    ease: 'power2.out',
    onComplete: () => notification.remove()
  });
}

// ===== CART MODAL MANAGEMENT =====
function setupCartModal() {
  const cartIcon = document.getElementById('cartIcon');
  const cartLink = document.getElementById('cartLink');
  const cartModal = document.getElementById('cartModal');
  const closeBtn = document.querySelector('.close-btn');

  function openCart() {
    cartModal.classList.add('active');
    gsap.from(document.querySelector('.cart-content'), {
      duration: 0.4,
      opacity: 0,
      y: 50,
      ease: 'back.out'
    });
  }

  function closeCart() {
    cartModal.classList.remove('active');
  }

  cartIcon.addEventListener('click', openCart);
  cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  });
  closeBtn.addEventListener('click', closeCart);

  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCart();
  });
}

// ===== FILTER FUNCTIONALITY =====
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentFilter = btn.dataset.filter;
      renderProducts(currentFilter);

      // Animate products grid
      gsap.from(document.querySelectorAll('.product-card'), {
        duration: 0.4,
        opacity: 0,
        y: 20,
        stagger: 0.05,
        ease: 'power2.out'
      });
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
  // Animate featured section title
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: 'power2.out'
    });
  });

  // Animate featured cards
  gsap.utils.toArray('.featured-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      duration: 0.8,
      opacity: 0,
      y: 40,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  });

  // Parallax effect for hero
  gsap.to('.hero-text', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    },
    y: 100,
    opacity: 0.7
  });
}

// ===== MOUSE FOLLOW LIGHTING =====
function setupMouseFollowLighting() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;

    hero.style.backgroundPosition = `${x}% ${y}%`;
  });
}

// ===== SMOOTH SCROLL BEHAVIOR =====
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== INTERSECTION OBSERVER FOR LAZY ANIMATIONS =====
function setupIntersectionObserver() {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.product-card, .featured-card').forEach(el => {
    observer.observe(el);
  });
}

// ===== LUXURY HOVER EFFECTS =====
function setupHoverEffects() {
  const cards = document.querySelectorAll('.product-card, .featured-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      gsap.to(this, {
        duration: 0.3,
        boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3)',
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', function () {
      gsap.to(this, {
        duration: 0.3,
        boxShadow: '0 0 20px rgba(212, 175, 55, 0)',
        ease: 'power2.out'
      });
    });
  });
}

// ===== BUTTON ANIMATIONS =====
function setupButtonAnimations() {
  const buttons = document.querySelectorAll('.cta-button, .add-to-cart-btn, .checkout-btn');

  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
      gsap.to(this, {
        duration: 0.3,
        scale: 1.05,
        ease: 'back.out'
      });
    });

    btn.addEventListener('mouseleave', function () {
      gsap.to(this, {
        duration: 0.3,
        scale: 1,
        ease: 'back.out'
      });
    });
  });
}

// ===== NAV ANIMATIONS =====
function setupNavAnimations() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      gsap.to(this, {
        duration: 0.3,
        color: '#d4af37',
        ease: 'power2.out'
      });
    });

    link.addEventListener('mouseleave', function () {
      gsap.to(this, {
        duration: 0.3,
        color: '#f5f5f5',
        ease: 'power2.out'
      });
    });
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  setupLoadingScreen();
  createFloatingParticles();
  initializePerfumeBottle();
  renderProducts('all');
  setupFilters();
  setupCartModal();
  setupScrollAnimations();
  setupMouseFollowLighting();
  setupSmoothScroll();
  setupIntersectionObserver();
  setupHoverEffects();
  setupButtonAnimations();
  setupNavAnimations();
  updateCartUI();

  // Add some extra GSAP animations for polish
  gsap.from('.luxury-nav', {
    duration: 0.6,
    opacity: 0,
    y: -50,
    ease: 'power2.out'
  });

  gsap.from('.hero-title', {
    duration: 1,
    opacity: 0,
    y: 50,
    delay: 0.3,
    ease: 'power2.out'
  });

  gsap.from('.hero-subtitle', {
    duration: 1,
    opacity: 0,
    y: 50,
    delay: 0.5,
    ease: 'power2.out'
  });
});

// Handle window resize for particles
window.addEventListener('resize', () => {
  // Add resize handling if needed
});

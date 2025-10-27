// ------------------------------
// Elements
// ------------------------------
const happyTab = document.querySelector('.happy-tab');
const happyBtn = document.querySelector('.btn-icon'); // smile face button
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');
const smileList = document.querySelector('.smile-list');
const happyListContainer = document.querySelector('.happy-list');
const submitBtn = document.querySelector('.submit-btn');

// Mobile nav
const mobileMenu = document.querySelector('.mobile-version');
const mobileToggle = document.querySelector('.mobile-toggle'); // hamburger

// ------------------------------
// Initialize likes from localStorage
// ------------------------------
let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

// ------------------------------
// Render liked items in side panel
// ------------------------------
function renderLikedItems() {
  if (!smileList) return;
  smileList.innerHTML = '';
  likedItems.forEach(item => {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div>
        <h7>${item.name}</h7>
      </div>
    `;
    smileList.appendChild(newItem);
  });
}
renderLikedItems();

// ------------------------------
// Side panel toggle
// ------------------------------
function toggleHappyTab() {
  happyTab.classList.toggle('happy-tab-active');
  overlay.classList.toggle('active');
}

if (happyBtn) happyBtn.addEventListener('click', toggleHappyTab);
if (closeBtn) closeBtn.addEventListener('click', toggleHappyTab);
if (overlay) overlay.addEventListener('click', toggleHappyTab);

// ------------------------------
// Generate restaurant cards
// ------------------------------
if (happyListContainer && typeof restaurants !== 'undefined') {
  restaurants.forEach(restaurant => {
    const card = document.createElement('div');
    card.classList.add('happy-item');
    card.innerHTML = `
      <div class="smile-image">
        <img src="${restaurant.image}" alt="${restaurant.name}">
      </div>
      <h4>${restaurant.name}</h4>
      <a href="#" class="btn-like"><i class="fa-solid fa-heart move"></i></a>
    `;
    happyListContainer.appendChild(card);
  });
}

// ------------------------------
// Handle likes (works for both existing and dynamic items)
// ------------------------------
document.addEventListener('click', e => {
  const heart = e.target.closest('.btn-like');
  if (!heart) return;

  e.preventDefault();
  const card = heart.closest('.happy-item');
  const name = card.querySelector('h4').textContent;
  const image = card.querySelector('img').src;

  heart.classList.toggle('liked');

  const index = likedItems.findIndex(i => i.name === name);

  if (heart.classList.contains('liked') && index === -1) {
    likedItems.push({ name, image });
  } else if (!heart.classList.contains('liked') && index !== -1) {
    likedItems.splice(index, 1);
  }

  localStorage.setItem('likedItems', JSON.stringify(likedItems));
  renderLikedItems();
});

// ------------------------------
// Keep hearts red if already liked
// ------------------------------
function updateHeartColors() {
  document.querySelectorAll('.happy-item').forEach(card => {
    const name = card.querySelector('h4').textContent;
    const heart = card.querySelector('.btn-like');
    if (likedItems.some(i => i.name === name)) {
      heart.classList.add('liked');
    } else {
      heart.classList.remove('liked');
    }
  });
}
updateHeartColors();

// ------------------------------
// Handle Submit button
// ------------------------------
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    if (likedItems.length === 0) {
      alert('You have no items to submit!');
      return;
    }
    console.log('Submitting liked items:', likedItems);
    likedItems = [];
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    renderLikedItems();
    updateHeartColors();
    alert('Your likes have been submitted!');
  });
}

// ------------------------------
// Mobile menu toggle
// ------------------------------
if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// Optional: close mobile menu when a link is clicked
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('active'));
});

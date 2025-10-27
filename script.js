// ------------------------------
// Elements
// ------------------------------
const happyTab = document.querySelector('.happy-tab');
const btnIcon = document.querySelector('.btn-icon');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');
const smileList = document.querySelector('.smile-list');
const happyListContainer = document.querySelector('.happy-list');

// ------------------------------
// Initialize likes from localStorage
// ------------------------------
let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

// ------------------------------
// Render the side panel
// ------------------------------
function renderLikedItems() {
  if (!smileList) return;
  smileList.innerHTML = '';
  likedItems.forEach((item) => {
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

// Initial render
renderLikedItems();

// ------------------------------
// Toggle side panel
// ------------------------------
if (btnIcon && happyTab && overlay) {
  btnIcon.addEventListener('click', () => {
    happyTab.classList.toggle('happy-tab-active');
    overlay.classList.toggle('active');
  });

  closeBtn.addEventListener('click', () => {
    happyTab.classList.remove('happy-tab-active');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    happyTab.classList.remove('happy-tab-active');
    overlay.classList.remove('active');
  });
}

// ------------------------------
// Generate restaurant cards dynamically
// ------------------------------
if (happyListContainer) {
  restaurants.forEach((restaurant) => {
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
// Handle likes (works for dynamic and existing items)
// ------------------------------
document.addEventListener('click', (e) => {
  if (!e.target.closest('.btn-like')) return;

  e.preventDefault();
  const heart = e.target.closest('.btn-like');
  const itemCard = heart.closest('.happy-item');
  const name = itemCard.querySelector('h4').textContent;
  const image = itemCard.querySelector('img').src;

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

// Run after generating cards
updateHeartColors();

// ------------------------------
// Handle Submit button
// ------------------------------
const submitBtn = document.querySelector('.submit-btn');

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    if (likedItems.length === 0) {
      alert('You have no items to submit!');
      return;
    }

    // For now, we just log the liked items (replace this with your API call)
    console.log('Submitting liked items:', likedItems);

    // Optional: clear likes after submitting
    likedItems = [];
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    renderLikedItems();
    updateHeartColors();

    alert('Your likes have been submitted!');
  });
}

const happyIcon = document.querySelector('.happy');
const mobileMenu = document.querySelector('.mobile-version');

happyIcon.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

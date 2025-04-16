const container = document.getElementById('product-container');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-price');

let allProducts = [];

async function fetchProducts() {
  loader.style.display = 'block';
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  allProducts = data;
  loader.style.display = 'none';
  renderProducts(data);
}

function renderProducts(products) {
  container.innerHTML = '';
  products.forEach(p => {
    container.innerHTML += `
    <div class="bosh">
      <div class="card">
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.price} $</p>
      </div>
    </div>  
    `;
  });
}

function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const sort = sortSelect.value;

  let filtered = [...allProducts];

  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(search));
  }

  filtered.sort((a, b) => {
    return sort === 'asc' ? a.price - b.price : b.price - a.price;
  });

  renderProducts(filtered);
}


searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);

fetchProducts();



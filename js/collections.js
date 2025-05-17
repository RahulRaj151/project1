$(document).ready(function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Floral Summer Dress',
            price: 89.99,
            category: 'dresses',
            size: ['xs', 's', 'm', 'l'],
            image: 'images/product-1.jpg',
            popularity: 4.5
        },
        {
            id: 2,
            name: 'Classic White Shirt',
            price: 49.99,
            category: 'tops',
            size: ['s', 'm', 'l', 'xl'],
            image: 'images/product-2.jpg',
            popularity: 4.2
        },
        // Add more products as needed
    ];

    let filteredProducts = [...products];

    // Function to render products
    function renderProducts(products) {
        const productsGrid = $('.products-grid');
        productsGrid.empty();

        products.forEach(product => {
            const productCard = `
                <div class="product-card" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;
            productsGrid.append(productCard);
        });
    }

    // Initialize products
    renderProducts(products);

    // Filter functionality
    function applyFilters() {
        const selectedCategories = $('input[type="checkbox"]:checked')
            .map(function() { return $(this).val(); })
            .get();

        const minPrice = parseFloat($('#min-price').val());
        const maxPrice = parseFloat($('#max-price').val());

        filteredProducts = products.filter(product => {
            const matchesCategory = selectedCategories.length === 0 || 
                selectedCategories.includes(product.category);
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

            return matchesCategory && matchesPrice;
        });

        // Apply current sort
        applySorting();
    }

    // Sorting functionality
    function applySorting() {
        const sortBy = $('#sort-select').val();

        filteredProducts.sort((a, b) => {
            switch(sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'popular':
                    return b.popularity - a.popularity;
                case 'newest':
                default:
                    return b.id - a.id;
            }
        });

        renderProducts(filteredProducts);
    }

    // Event listeners
    $('#apply-filters').click(applyFilters);
    $('#sort-select').change(applySorting);

    // Price range slider
    $('#price-slider').on('input', function() {
        const value = $(this).val();
        $('#max-price').val(value);
    });

    $('.price-inputs input').on('change', function() {
        const minPrice = parseFloat($('#min-price').val());
        const maxPrice = parseFloat($('#max-price').val());
        $('#price-slider').val(maxPrice);
    });

    // Add to cart functionality
    $(document).on('click', '.add-to-cart', function() {
        const productId = $(this).closest('.product-card').data('id');
        const product = products.find(p => p.id === productId);
        
        if (product) {
            // Implement cart functionality here
            console.log(`Added ${product.name} to cart`);
            // Show success message
            alert('Product added to cart!');
        }
    });

    // Pagination functionality
    $('.page-btn').click(function() {
        $('.page-btn').removeClass('active');
        $(this).addClass('active');
        // Implement pagination logic here
        const page = $(this).data('page');
        console.log(`Loading page ${page}`);
    });
});

function toggleFilters() {
    const panel = document.getElementById("filterPanel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}

  

  function applyFilters() {
    const showOutOfStock = document.getElementById("outOfStockFilter").checked;
    const selectedSizes = Array.from(document.querySelectorAll(".size-filter:checked")).map(cb => cb.value);
    const minPrice = parseInt(document.getElementById("minPrice").value);
    const maxPrice = parseInt(document.getElementById("maxPrice").value);
  
    const filterTagsContainer = document.getElementById("filterTags");
    const appliedFiltersContainer = document.getElementById("appliedFilters");
    filterTagsContainer.innerHTML = "";
  
    let hasFilters = false;
  
    if (showOutOfStock) {
      hasFilters = true;
      filterTagsContainer.innerHTML += `<span class="filter-tag">Out of Stock</span>`;
    }
  
    if (selectedSizes.length > 0) {
      hasFilters = true;
      selectedSizes.forEach(size => {
        filterTagsContainer.innerHTML += `<span class="filter-tag">Size: ${size}</span>`;
      });
    }
  
    if (minPrice > 0 || maxPrice < 5000) {
      hasFilters = true;
      filterTagsContainer.innerHTML += `<span class="filter-tag">Price: ₹${minPrice} - ₹${maxPrice}</span>`;
    }
  
    appliedFiltersContainer.style.display = hasFilters ? "block" : "none";
  
    document.querySelectorAll(".product").forEach(product => {
      const isOut = product.dataset.stock === "out";
      const size = product.dataset.size;
      const price = parseInt(product.dataset.price);
  
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(size);
      const matchesPrice = price >= minPrice && price <= maxPrice;
  
      product.style.display = matchesSize && matchesPrice ? "block" : "none";
  
      if (isOut && showOutOfStock) {
        product.classList.add("out-of-stock");
      } else {
        product.classList.remove("out-of-stock");
      }
    });
  }
  
  function clearAll() {
    document.getElementById("outOfStockFilter").checked = false;
    document.querySelectorAll(".size-filter").forEach(cb => cb.checked = false);
    document.getElementById("minPrice").value = 0;
    document.getElementById("maxPrice").value = 5000;
    document.getElementById("priceRange").value = 5000;
    document.getElementById("appliedFilters").style.display = "none";
    document.getElementById("filterTags").innerHTML = "";
    applyFilters();
  }
  
  function syncMaxPrice() {
    const sliderValue = document.getElementById("priceRange").value;
    document.getElementById("maxPrice").value = sliderValue;
    applyFilters();
  }

  document.getElementById('filtersForm').addEventListener('submit', function(event) {
  event.preventDefault(); // prevent page reload

  const minPrice = document.getElementById('minPrice').value;
  const maxPrice = document.getElementById('maxPrice').value;
  const sort = document.querySelector('input[name="sort"]:checked')?.value;

  console.log('Apply Filter:', { minPrice, maxPrice, sort });

  // Add your filtering logic here
});

  
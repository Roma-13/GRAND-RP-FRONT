document.addEventListener('DOMContentLoaded', function() {
    const FOOD_PRODUCTS = [
        {
            id: 1,
            name: "პური",
            category: "კლასიკური",
            price: 4.00,
            image: "bread.svg",
        },
        {
            id: 2,
            name: "ბურგერი",
            category: "კლასიკური",
            price: 4.50,
            image: "burger.svg",
        },
        {
            id: 6,
            name: "პიცა",
            category: "კლასიკური",
            price: 4.80,
            image: "pizza.svg",
        },
        {
            id: 3,
            name: "ძეხვი",
            category: "ხორცი",
            price: 6.20,
            image: "sausage.svg",
        },
        {
            id: 4,
            name: "გაყინული პიცა",
            category: "გაყინული",
            price: 5.80,
            image: "frozenpizza.svg",
        },
        {
            id: 5,
            name: "გაყინული ბურგერი",
            category: "გაყინული",
            price: 5.50,
            image: "frozenburger.svg",
        }
    ];

    const DRINK_PRODUCTS = [
        {
            id: 7,
            name: "წყალი",
            category: "ცივი სასმელები",
            price: 1.50,
            image: "water.svg",
        },
        {
            id: 8,
            name: "ლუდი",
            category: "ცივი სასმელები",
            price: 3.20,
            image: "beer.svg",
        },
        {
            id: 9,
            name: "კოკა-კოლა",
            category: "ცივი სასმელები",
            price: 2.50,
            image: "cocacola.svg",
        },
        {
            id: 10,
            name: "ყავა",
            category: "ცხელი სასმელები",
            price: 4.00,
            image: "coffe.svg",
        },
       
    ];

    let currentProducts = FOOD_PRODUCTS;
    let currentCategory = "food";
    let currentSubCategory = "all";

    const cart = {
        items: [],
        
        addItem: function(id, name, price, image) {
            const existingItem = this.items.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    id: id,
                    name: name,
                    price: parseFloat(price),
                    quantity: 1,
                    image: image
                });
            }
            
            this.updateCartUI();
        },
        
        removeItem: function(id) {
            const itemIndex = this.items.findIndex(item => item.id === id);
            
            if (itemIndex !== -1) {
                this.items.splice(itemIndex, 1);
                this.updateCartUI();
            }
        },
        
        updateQuantity: function(id, newQuantity) {
            const item = this.items.find(item => item.id === id);
            
            if (item) {
                if (newQuantity < 1) {
                    this.removeItem(id);
                } else {
                    item.quantity = newQuantity;
                }
                this.updateCartUI();
            }
        },
        
        clearCart: function() {
            this.items = [];
            this.updateCartUI();
        },
        
        getProductsTotal: function() {
            return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        
        getGrandTotal: function() {
            return this.getProductsTotal(); 
        },
        
        updateCartUI: function() {
            const cartItemsContainer = document.querySelector('.cart-items');
            const cartSubtitle = document.querySelector('.cart-subtitle');
            const productsTotal = document.querySelector('.products-total');
            const grandTotal = document.querySelector('.grand-total');
            const checkoutButton = document.querySelector('.checkout-button');
            
            if (this.items.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-basket"></i>
                        <p>თქვენი კალათი ცარიელია</p>
                    </div>
                `;
                checkoutButton.disabled = true;
            } else {
                cartItemsContainer.innerHTML = '';
                this.items.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-controls">
                            <button class="quantity-control minus" data-id="${item.id}">-</button>
                            <div class="quantity-display">${item.quantity}</div>
                            <button class="quantity-control plus" data-id="${item.id}">+</button>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });
                checkoutButton.disabled = false;
            }
            
            const itemCount = this.items.reduce((count, item) => count + item.quantity, 0);
            cartSubtitle.textContent = `${itemCount} პროდუქტი დამატებულია`;
            productsTotal.textContent = `$${this.getProductsTotal().toFixed(2)}`;
            grandTotal.textContent = `$${this.getGrandTotal().toFixed(2)}`;
            
            this.attachQuantityControlListeners();
        },
        
        attachQuantityControlListeners: function() {
            document.querySelectorAll('.quantity-control.minus').forEach(button => {
                button.addEventListener('click', () => {
                    const id = parseInt(button.getAttribute('data-id'));
                    const item = this.items.find(item => item.id === id);
                    if (item) {
                        this.updateQuantity(id, item.quantity - 1);
                    }
                });
            });
            
            document.querySelectorAll('.quantity-control.plus').forEach(button => {
                button.addEventListener('click', () => {
                    const id = parseInt(button.getAttribute('data-id'));
                    const item = this.items.find(item => item.id === id);
                    if (item) {
                        this.updateQuantity(id, item.quantity + 1);
                    }
                });
            });
        }
    };
    
    function renderProducts(products) {
        const container = document.getElementById('products-container');
        container.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
          
            productCard.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-details">
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price-row">
                        <div class="product-price">
                            <span class="price-currency">$</span>${product.price.toFixed(2)}
                        </div>
                        <button class="add-button" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(productCard);
        });
        
        attachAddButtonListeners();
    }
    
    function updateCategoriesUI(category) {
        const categoriesContainer = document.getElementById('categories-container');
        categoriesContainer.innerHTML = '';
        
        if (category === 'food') {
            categoriesContainer.innerHTML = `
                <div class="category-pill active" data-category="all">ყველა</div>
                <div class="category-pill" data-category="classic">კლასიკური</div>
                <div class="category-pill" data-category="frozen">გაყინული</div>
                <div class="category-pill" data-category="meat">ხორცი</div>
            `;
        } else {
            categoriesContainer.innerHTML = `
                <div class="category-pill active" data-category="all">ყველა</div>
                <div class="category-pill" data-category="cold">ცივი სასმელები</div>
                <div class="category-pill" data-category="hot">ცხელი სასმელები</div>
            `;
        }
        
        attachCategoryListeners();
    }
    
    function attachAddButtonListeners() {
        document.querySelectorAll('.add-button').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const name = this.getAttribute('data-name');
                const price = this.getAttribute('data-price');
                const image = this.getAttribute('data-image');
                cart.addItem(id, name, price, image);
                
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.backgroundColor = '#2AA952';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-plus"></i>';
                    this.style.backgroundColor = '';
                }, 1000);
            });
        });
    }
    
    function attachCategoryListeners() {
document.querySelectorAll('.category-pill').forEach((pill, index) => {
pill.addEventListener('click', function() {
    document.querySelectorAll('.category-pill').forEach(p => {
        p.classList.remove('active');
    });
    this.classList.add('active');
    
    const category = this.getAttribute('data-category');
    currentSubCategory = category;
    
    let filteredProducts = currentProducts;
    
    if (currentCategory === 'food') {
        if (category === 'classic') {
            filteredProducts = currentProducts.filter(product => 
                product.category.includes('კლასიკური')
            );
        } else if (category === 'frozen') {
            filteredProducts = currentProducts.filter(product => 
                product.category.includes('გაყინული')
            );
        } else if (category === 'meat') { 
            filteredProducts = currentProducts.filter(product => 
                product.category.includes('ხორცი')
            );
        }
    } else {
        if (category === 'cold') {
            filteredProducts = currentProducts.filter(product => 
                product.category.includes('ცივი')
            );
        } else if (category === 'hot') {
            filteredProducts = currentProducts.filter(product => 
                product.category.includes('ცხელი')
            );
        }
    }
    
    renderProducts(filteredProducts);
});
});
}
    
    function attachMenuListeners() {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.menu-item').forEach(i => {
                    i.classList.remove('active');
                });
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                currentCategory = category;
                
                if (category === 'food') {
                    currentProducts = FOOD_PRODUCTS;
                    document.querySelector('.section-title').textContent = '24/7 მაღაზია';
                    document.querySelector('.section-subtitle').textContent = 'აირჩიეთ თქვენი სასურველი პროდუქტი';
                } else {
                    currentProducts = DRINK_PRODUCTS;
                    document.querySelector('.section-title').textContent = 'სასმელები';
                    document.querySelector('.section-subtitle').textContent = 'აირჩიეთ თქვენი სასურველი სასმელი';
                }
                
                updateCategoriesUI(category);
                renderProducts(currentProducts);
            });
        });
    }
    
    document.querySelector('.clear-cart').addEventListener('click', function() {
        cart.clearCart();
    });
    
    document.querySelector('.close-button').addEventListener('click', function() {
        document.querySelector('.market-ui-container').style.display = 'none';
    });
    
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredProducts = currentProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
    
    attachMenuListeners();
    updateCategoriesUI(currentCategory)
    renderProducts(currentProducts);
    cart.updateCartUI();
});
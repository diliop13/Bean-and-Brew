const cart = JSON.parse(localStorage.getItem('cart')) || [];
const container = document.getElementById('cart-items-container');
let total = 0;

if (cart.length > 0) {
    container.innerHTML = '';
    
    cart.forEach((item, index) => {
        // Αν το προϊόν μπαίνει πρώτη φορά, του δίνουμε ποσότητα 1
        if (!item.quantity) {
            item.quantity = 1;
        }
        
        // Πολλαπλασιάζουμε την τιμή με την ποσότητα
        const itemTotal = parseFloat(item.price) * item.quantity;
        
        // Προσθέτουμε τη σωστή συνολική τιμή του προϊόντος στο Total
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        // Στο value βάζουμε το ${item.quantity} για να "θυμάται" τον αριθμό μετά το reload
        itemElement.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">$${itemTotal.toFixed(2)}</span>
            <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-index="${index}">
            <button class="remove-btn remove-from-cart" data-index="${index}">Remove</button>
        `;
        container.appendChild(itemElement);
    });
} else {
    container.innerHTML = '<p>Your cart is currently empty.</p>';
}

// ΔΙΑΓΡΑΦΗ ΚΑΛΑΘΙΟΥ 
const removeButtons = document.querySelectorAll('.remove-from-cart');
removeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    });
});

// UPDATE TOTAL PRICE
const quantinyInputs = document.querySelectorAll('.item-quantity');
quantinyInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        const index = e.target.getAttribute('data-index');
        const newQuantity = parseInt(e.target.value);
        
        if (newQuantity >= 1) {
            cart[index].quantity = newQuantity; 
            localStorage.setItem('cart', JSON.stringify(cart)); 
            location.reload(); 
        }
    });
});
        
const totalPriceElement = document.getElementById('cart-total');
if (totalPriceElement) {
    totalPriceElement.textContent = '$' + total.toFixed(2);
}

const clearCartBtn = document.getElementById('clear-cart-btn');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        location.reload();
    });
}

// --- ΚΩΔΙΚΑΣ ΑΓΟΡΑΣ ΠΟΥ ΣΤΕΛΝΕΙ ΣΤΗ ΒΑΣΗ ΔΕΔΟΜΕΝΩΝ (SPRING BOOT) ---
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
            return;
        }
        
        let order = "";
        cart.forEach(product => { 
            order += `Product: ${product.name},Quantity: ${product.quantity} | `; 
        });

        const orderPayload = {
            item: order,
            total: parseFloat(total.toFixed(2)) 
        };

        fetch('http://localhost:8081/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderPayload)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Order placed successfully:', data);
            alert('Η παραγγελία σας καταχωρήθηκε επιτυχώς!'); 
            localStorage.removeItem('cart');
            location.reload();
        })
        .catch(error => {
            console.error('Error placing order:', error);
        });
    });
}
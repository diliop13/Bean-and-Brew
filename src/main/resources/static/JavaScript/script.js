const buttons = document.querySelectorAll('.add-to-cart');

buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const product =btn.getAttribute('data-product');
            const price = btn.getAttribute('data-price');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const newItem ={
                name: product,
                price: price
            };
            cart.push(newItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            const toast = document.getElementById('cart-toast');
            if(toast){
                toast.textContent = `${product} has been added to your cart!`;
                toast.classList.add('show');
                setTimeout(() => {
                toast.classList.remove('show');
                }, 3000);
            }
            if(window.location.href.includes('cart.html')){
                location.reload();
            }
        });
});
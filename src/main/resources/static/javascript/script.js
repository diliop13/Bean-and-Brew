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

//ΕΛΕΓΧΟΣ ΓΙΑ ΤΟ ΑΝ ΕΙΑΝΙ ΣΥΝΔΕΔΕΜΕΝΟΣ ΧΡΗΣΤΗΣ 
const loggedUser = localStorage.getItem("loggedUser");

document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = localStorage.getItem("loggedUser"); // Βάλε το ακριβές όνομα που έχεις στο F12

    if (loggedUser !== null) {
        const loginLink=document.querySelector(".login-link");
        const menu=document.querySelector(".logged-in-menu");

        if(loginLink && menu){
            loginLink.addEventListener("click",(e) =>{
                e.preventDefault();
                e.stopPropagation();

                if(menu.style.display === "block"){
                    menu.style.display="none";
                }else{
                    menu.style.display="block";
                }
            });       
            document.addEventListener("click", (e) =>{
                if(menu.style.display ==="block" && !menu.contains(e.target)){
                    menu.style.display = "none";
                }
            });
        }
    }
});
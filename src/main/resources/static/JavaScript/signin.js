    const userIcon = document.getElementById('user-icon');
    const lock = document.getElementById('lock-icon');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameErr = document.getElementById('username-err');
    const button = document.getElementById('loginBtn');

    //ΝΑ ΣΥΝΔΕΘΕΙ ΜΕ ΒΑΣΗ ΔΕΔΟΜΕΝΩΝ ΚΑΙ ΝΑ ΕΛΕΓΧΕΙ ΤΑ ΣΤΟΙΧΕΙΑ
    //ΕΛΕΓΧΟΣ USERNAME
   usernameInput.addEventListener('input', () => {
    const value = usernameInput.value.trim();
        userIcon.innerHTML = ""; // ουδέτερο icon όταν γράφει
        usernameErr.style.visibility = "hidden"; // μην εμφανίζουμε error αμέσως
    
});

// Εμφάνιση error όταν φύγει από το input και είναι κενό
usernameInput.addEventListener('blur', () => {
    if (usernameInput.value.trim() == "") {
        userIcon.innerHTML = "<i class='bx bx-x'></i>";
        usernameErr.textContent = "Please enter a valid username.";
        usernameErr.style.visibility = "visible";
    }else {
        userIcon.innerHTML = "<i class='bx bx-check'></i>";
        usernameErr.style.visibility = "hidden";
    }
});

    //ΝΑ ΣΥΝΔΕΘΕΙ ΜΕ ΒΑΣΗ ΔΕΔΟΜΕΝΩΝ ΚΑΙ ΝΑ ΕΛΕΓΧΕΙ ΤΑ ΣΤΟΙΧΕΙΑ
    //PASSWORD VALIDATION
    
    lock.style.pointerEvents = "none"; // Αρχικά απενεργοποιημένο το κλικ

    passwordInput.addEventListener('input', () => {
    // Αν το πεδίο δεν είναι κενό, δείξε το μάτι
    if (passwordInput.value.length > 0) {
        lock.innerHTML = '<i class="bx bx-hide" style="cursor: pointer;"></i>';
        lock.style.pointerEvents = "auto";
    } else {
        // Αν αδειάσει, ξαναβάλε το λουκέτο
        lock.innerHTML = '<i class="bx bx-lock"></i>';
        lock.style.pointerEvents = "none";
        passwordInput.type = "password"; // Επαναφορά σε κρυφό κείμενο
    }
});


lock.addEventListener('click', () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        lock.innerHTML = '<i class="bx bx-show"></i>';
    } else {
        passwordInput.type = "password";
        lock.innerHTML = '<i class="bx bx-hide"></i>';
    }
 });

 // Εμφάνιση error όταν φύγει από το input και είναι κενό για κωδικό
 passwordInput.addEventListener('blur', () => {
    const errorSpan = document.getElementById('passwordErr');
    if (passwordInput.value.length === 0) {
        errorSpan.textContent = "Password cannot be empty.";
        errorSpan.style.visibility = "visible";
    }else
    {
        errorSpan.style.visibility = "hidden";
    }
});

 button.addEventListener('click', async(e) => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    const userData ={
        username: username,
        password: password
    };
    
    try{
        const response = await fetch('/api/login',{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(userData)
        });

        const result= await response.text();

        //ΑΜΑ ΠΡΑΓΜΑΤΟΠΟΙΗΘΕΙ ΤΟ LOGIN KANEI:
        if(response.ok){
            localStorage.setItem("loggedUser",username);
            window.location.href="../index.html";
        }
        //ΑΝ ΔΕΝ ΓΙΝΕΙ ΓΙΑ ΚΑΠΟΙΟ ΛΟΓΟ ΕΜΦΑΝΙΖΕΙ
        else{
            // Βρίσκουμε και τα δύο στοιχεία HTML για τα λάθη
            const userErrorSpan = document.getElementById('username-err'); 
            const passErrorSpan = document.getElementById('passwordErr'); 
            
            // Κρύβουμε τα προηγούμενα μηνύματα (αν υπήρχαν)
            userErrorSpan.style.visibility = "hidden";
            passErrorSpan.style.visibility = "hidden";

            // Ελέγχουμε την ακριβή απάντηση του backend
            if (result === "User not found!") {
                userErrorSpan.textContent = result;
                userErrorSpan.style.visibility = "visible";
            } else if (result === "Invalid password!") {
                passErrorSpan.textContent = result;
                passErrorSpan.style.visibility = "visible";
            } else {
                // Αν έρθει κάποιο άλλο απρόσμενο σφάλμα
                alert("ERROR: " + result);
            }
        }
    
    }catch(error){
        alert("The error is: "+error.message);
        console.error(error);
    }

}); 


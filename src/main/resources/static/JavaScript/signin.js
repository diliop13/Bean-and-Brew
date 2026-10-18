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
    if (usernameInput.value.trim() !== "sakis") {
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

 button.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Απλός έλεγχος για παράδειγμα
    // Μπορείτε να αντικαταστήσετε αυτό με πραγματική λογική ελέγχου
    if (username === "sakis" && password === "12345") {
        alert("Login successful!");
        // Προχωρήστε στην επόμενη σελίδα ή λειτουργία
    } else {
        alert("Invalid username or password.");
    }
    }); 


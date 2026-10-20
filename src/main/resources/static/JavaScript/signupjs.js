const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const loginBox = document.getElementById('login');
const signupBox = document.getElementById('signup');    
const newUsername = document.getElementById('new-username'); 
const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password');
const signupBtn = document.getElementById('signUpBtn'); 
const agreeTerms = document.getElementById('agreeTerms');

let userexists  = true;
let passwordvalid = false;
let passwordsMatch = false;


/*ΑΝΑΖΗΤΗ ΣΤΗΝ ΒΑΣΗ ΔΕΔΟΜΕΝΩΝ ΑΝ ΥΠΑΡΧΕΙ Ο USERNAME*/
newUsername.addEventListener('blur', () => {
    const usernameErr = document.getElementById('username-err2');
    const value = newUsername.value.trim();
    // Προσομοίωση έλεγχου στη βάση δεδομένων
    const existingUsernames = ['sakis', 'admin', 'user1']; // Παράδειγμα υπαρχόντων usernames
    if (existingUsernames.includes(value)) {
        usernameErr.textContent = "Username already exists.";
        usernameErr.style.visibility = "visible";
        usderexists = true;
    } else {
        usernameErr.style.visibility = "hidden";
        userexists = false;
    }
});
/*VALIDATION ΓΙΑ ΝΕΟ ΚΩΔΙΚΟ ΚΑΙ ΕΠΙΒΕΒΑΙΩΣΗ ΚΩΔΙΚΟΥ*/
newPassword.addEventListener('blur', () => {
    const passwordErr = document.getElementById('password-err');
    const value = newPassword.value.trim();
    if (value.length < 8) {
        passwordErr.textContent = "Password must be at least 8 characters.";
        passwordErr.style.visibility = "visible";
        passwordvalid = false;
    } else {
        passwordErr.style.visibility = "hidden";
        passwordvalid = true;
    }
});
// Επιβεβαίωση κωδικού
confirmPassword.addEventListener('blur', () => {
    const confirmPasswordErr = document.getElementById('confirm-password-err');
    const value = confirmPassword.value.trim();
    if (value !== newPassword.value.trim()) {
        confirmPasswordErr.textContent = "Passwords do not match.";
        confirmPasswordErr.style.visibility = "visible";
        passwordsMatch = false;
    } else {
        confirmPasswordErr.style.visibility = "hidden";
        passwordsMatch = true;
    }
});
 
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const validForm= !userexists && passwordvalid && passwordsMatch && agreeTerms.checked;
    if (validForm) {
        const userData = {
        username: document.getElementById('new-username').value,
        // Αν έχεις email input, πρόσθεσέ το εδώ
        password: document.getElementById('new-password').value
        };

        fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
        })
        .then(response => response.text())
        .then(data => {
        console.log("Response from Java:", data);
        alert("Backend says: " + data);
        });
        // Εδώ μπορείς να προσθέσεις κώδικα για αποστολή των στοιχείων στη βάση δεδομένων
    } 
    else 
    {
        alert("Please fix the errors before signing up.");
    }   
});

// ΑΠΟΣΤΟΛΗ ΔΕΔΟΜΕΝΩΝ ΣΤΟ BACKEND ΜΕ FETCH API
document.addEventListener('DOMContentLoaded', () => {
    // Βεβαιώσου ότι στο signup.html το κουμπί σου έχει id="signupBtn"
    const signupBtn = document.getElementById('signUpBtn');

    signupBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Εμποδίζει το refresh της σελίδας

        const userData = {
            username: document.getElementById('new-username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('new-password').value
        };

        console.log("Στέλνω δεδομένα:", userData);

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const result = await response.text();
            alert("Απόκριση Backend: " + result);   
        } catch (error) {
            console.error("Σφάλμα:", error);
            alert("Αποτυχία σύνδεσης με το Backend");
        }
    });
});
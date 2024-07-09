document.addEventListener('DOMContentLoaded', () => {
    const openLoginBtn = document.getElementById('openLogin');
    const closeLoginBtn = document.getElementById('closeLogin');
    const loginPopup = document.getElementById('loginPopup');
    const loginForm = document.getElementById('loginForm');


    // Api fetch of login 
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login successful: ' + data.message);
                loginPopup.style.display = 'none';
            } else {
                const error = await response.json();
                alert('Login failed: ' + error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
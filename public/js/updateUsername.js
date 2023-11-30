updateUsernameBtn = document.getElementById("updateUsername")
async function updateUsername() {
    try {    
        let usernamePrompt = prompt("Please enter a new username")
        if (usernamePrompt == null) {
            return; 
        }
        const body = {user: usernamePrompt}
        const usernamePattern = /^(?! )[\w\s']{1,30}$/;
        if (!usernamePattern.test(usernamePrompt)) {
            alert("Please ensure you provide a name that contains only letters and numbers and is less than 30 characters long.")
            return;
        } else {
            const jsonBody = JSON.stringify(body);
            const request = await fetch('/profile/updateUsername', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: jsonBody,
            })
            .then(response => {
                if (response.ok) {
                    alert("Saved to database")
                    window.location.reload()
                } 
                else {
                    alert("Username has been taken")
                }
                return response.json();
            })
            .then(data => {
            })
        }
    }
    catch(err) {
        console.error('Error:', err);
    }
};
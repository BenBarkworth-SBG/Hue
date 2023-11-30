document.getElementById("regform").addEventListener("submit", sendRegister);
function sendRegister(e){
    const user = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    const namePattern = /^[^<>]{10,50}$/;
    if (!namePattern.test(pass)) {
        alert("Please ensure you provide a password that is between 10 and 50 characters long and doesn't contain arrow symbols")
        e.preventDefault();
        return false;
    }
    else {
        const body = {
            user: user,
            email: email,
            pass: pass,
        };

        const jsonBody = JSON.stringify(body);
        
        fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonBody,
        })
        .then((res) => {
            if (res.ok) {
                window.location.href = res.url;
            }
            else {
                return res.json();
            }
        })
        .then((errorData) => {
            // Handle the error data
            if (errorData && errorData.error) {
                let errorMessage;
                try {
                    const errorObject = JSON.parse(errorData.error);
                    // Check if the parsed object has a 'message' property
                    if (errorObject.message) {
                        errorMessage = errorObject.message;
                    } else {
                        errorMessage = 'An unknown error occurred.';
                    }
                } catch (e) {
                    
                    errorList = errorData.error.split(':')
                    errorMessage = errorList[errorList.length - 1].trim();
                }
                alert(errorMessage)
            }                    
        })
        .catch((err) => {
            console.error(err);
        });
        e.preventDefault();
        return false;
    }
}
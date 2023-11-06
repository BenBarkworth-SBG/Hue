// elem represents the button clicked
async function savePalette(elem) {
    try {    
        let buttonId = elem.id;
        let namePrompt = prompt("Please enter a name for your palette")
        if (namePrompt == null) {
            return; // breaks out of the function if the user clicks cancel on prompt
        }
        let hex = document.getElementById('hexOutput').innerHTML;
        let hexSplit = hex.slice(4,11)
        const body = {hexCode: hexSplit, paletteType: buttonId, name: namePrompt}
        const namePattern = /[^A-Za-z0-9\s]/;
        if (!body.paletteType || !body.hexCode || body.hexCode.length > 7) {
            alert("Internal server error.")
            return;
        } else if (!body.name.trim()) {
            alert("Please ensure you provide a name.")
            return;
        } else if (namePattern.test(body.name) || body.name.length > 20) {
            alert("Please ensure you provide a name that contains only letters and numbers and is less than 20 characters long.")
            return;
        } else {
            const jsonBody = JSON.stringify(body);
            const request = await fetch('/palette', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: `${jsonBody}`
            })
            .then(response => {
                if (response.ok) {
                    alert("Saved to database")
                } 
                else {
                    alert("The palette is already in the database or the name has been used previously")
                }
                setTimeout(function() {
                        window.location.reload()
                    }, 1500);
                    // delays page reload by 1.5 seconds
                return response.json();
            })
            .then(data => {
            // logs data passed into database in console
                // console.log(data)
            })
        }
    }
    catch(err) {
        console.error('Error:', err);
    }
};
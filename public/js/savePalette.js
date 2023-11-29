paletteGeneratorBtn = document.getElementById("paletteGenBtn")

// elem represents the button clicked
async function savePalette(elem) {
    try {    
        let buttonId = elem.id;
        let namePrompt = prompt("Please enter a name for your palette")
        if (namePrompt == null) {
            return; // breaks out of the function if the user clicks cancel on prompt
        }
        // let hex = document.getElementById('hexOutput').innerHTML;
        const className = buttonId + "Container"
        const divContainer = document.getElementById(className)
        const divChildren = divContainer.children
        let hexCodes = []
        for (let index = 0; index < divChildren.length; index++) {
            hexCodes.push(divChildren[index].value)
        }
        const body = {hexCodes: hexCodes, paletteType: buttonId, paletteName: namePrompt}
        // checks that the string only consists of letters and digits and doesn't start with a space
        const namePattern = /^(?! )[A-Za-z0-9]+$/;
        if (!body.paletteType || !body.hexCodes) {
            alert("Internal server error.")
            return;
        } else if (!body.paletteName.trim()) {
            alert("Please ensure you provide a name.")
            return;
        } else if (!namePattern.test(body.paletteName) || body.paletteName.length > 20) {
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
                    checkboxSet.delete(buttonId)        
                    let combined = elem.id + "Container"
                    const identifier = document.getElementById(combined)
                    identifier.innerHTML = '';
                    elem.style.display = "none";
                    const checkboxName = String(buttonId + "Checkbox")
                    const checkbox = document.getElementById(checkboxName)
                    checkbox.checked = false
                    if (checkboxSet.size === 0) {
                        paletteGeneratorBtn.disabled = true;
                        // window.location.reload()
                    }
                    alert("Saved to database")
                } 
                else {
                    alert("The palette is already in the database or the name has been used previously")
                }
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
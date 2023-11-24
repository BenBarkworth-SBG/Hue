function userInput() {
    let userHexInput = document.getElementById('userHexCode');
    let userRgbInput = document.getElementById('userRgb');

    if (userHexInput.value.trim().length < 1 && userRgbInput.value.trim().length < 1) {
        alert("Please enter either a hex code or an RGB value in one of the boxes.")
        return;
    }
    if (userHexInput.value.trim().length > 0) {
        let regex = new RegExp("^#[a-fA-F0-9]{6}$")
        if (!regex.test(userHexInput.value)) {
            alert("Please ensure the hex code inputted follows the hexadecimal system.")
            userHexInput.value = userHexInput.defaultValue;
            return;
        }
        const hexConversion = hexToRgb(userHexInput.value)
        document.getElementById('red').value = hexConversion[0]
        document.getElementById('green').value = hexConversion[1]
        document.getElementById('blue').value = hexConversion[2]
    }
    else {
        // regex to ensureinput is three values separated by commas in brackets
        let regex = new RegExp("^\\(\\d+,\\d+,\\d+\\)$")
        if (!regex.test(userRgbInput.value)) {
            alert("Please ensure the rgb value inputted follows the correct format.")
            userRgbInput.value = userRgbInput.defaultValue;
            return;
        }
        // backslashes needed to match brackets literally
        cleanedString = userRgbInput.value.replace(/\(|\)/g, '').split(',')
        for (let i = 0; i < cleanedString.length; i++) {
            if (parseInt(cleanedString[i]) > 255) {
                userRgbInput.value = userRgbInput.defaultValue
                alert("Please ensure none of the individual values are above 255.")
                return;
            }
        }
        document.getElementById('red').value = cleanedString[0]
        document.getElementById('green').value = cleanedString[1]
        document.getElementById('blue').value = cleanedString[2]
    }
    colors()
    if (checkboxSet.size > 0) {
        generatePalettes()
    }
    // resetting inputs
    userHexInput.value = userHexInput.defaultValue;
    userRgbInput.value = userRgbInput.defaultValue;
}
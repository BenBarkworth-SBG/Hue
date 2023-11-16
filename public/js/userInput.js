function userInput() {
    let userHexInput = document.getElementById('userHexCode');
    let userRgbInput = document.getElementById('userRgb');

    if (userHexInput.value.trim().length < 1 && userRgbInput.value.trim().length < 1) {
        alert("Please enter either a hex code or an RGB value in one of the boxes.")
        return;
    }
    if (userHexInput.value.trim().length > 0) {
        console.log(typeof userHexInput.value)

        let regex = new RegExp("^#[a-fA-F0-9]{6}$")
        if (!regex.test(userHexInput.value)) {
            alert("Please ensure the hex code inputted follows the hexadecimal system.")
            userHexInput.value = userHexInput.defaultValue;
            return;
        }
        console.log(userHexInput.value)
        const hexConversion = hexToRgb(userHexInput.value)
        console.log(hexConversion)
        document.getElementById('red').value = hexConversion[0]
        document.getElementById('green').value = hexConversion[1]
        document.getElementById('blue').value = hexConversion[2]
    }
    else {
        let regex = new RegExp("^\\([0-9,]+\\)$")
        if (!regex.test(userRgbInput.value)) {
            alert("Please ensure the rgb value inputted follows the correct format.")
            userRgbInput.value = userRgbInput.defaultValue;
            return;
        }
        console.log(userRgbInput.value)
        // backslashes needed to match brackets literally
        let removeBrackets = userRgbInput.value.replace(/\(|\)/g, '')
        console.log(userRgbInput.value.replace(/(|)/g, ''))
        console.log(removeBrackets)
        let splitRGB = removeBrackets.split(',')
        console.log(splitRGB)
        for (let i = 0; i < splitRGB.length; i++) {
            if (parseInt(splitRGB[i]) < 0 || parseInt(splitRGB[i]) > 255) {
                userRgbInput.value = userRgbInput.defaultValue
                break;
            }
        }
        console.log(splitRGB[0],splitRGB[1],splitRGB[2])
        document.getElementById('red').value = splitRGB[0]
        document.getElementById('green').value = splitRGB[1]
        document.getElementById('blue').value = splitRGB[2]
    }
    colors()
    if (checkboxSet.size > 0) {
        generatePalettes()
    }
    userHexInput.value = userHexInput.defaultValue;
    userRgbInput.value = userRgbInput.defaultValue;
}
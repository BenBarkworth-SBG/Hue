let element = document.getElementsByClassName("color")
for (let index = 0; index < element.length; index++) {
    element[index].addEventListener("mouseenter", function(){
        let rgbSnippet = element[index].style.backgroundColor.substr(4,11);
        let rgbSplit = rgbSnippet.split(',')
        let hexConversion = rgbToHex(rgbSplit[0],rgbSplit[1],rgbSplit[2]);
        element[index].value = hexConversion
        let cmykValues = rgbToCmyk(rgbSplit[0],rgbSplit[1],rgbSplit[2])
        let blackValue = cmykValues[3]
        if (blackValue > 80) {
            element[index].innerHTML = `<p class="profileHexCodesLight"> ${element[index].value}</p>`
        }
        else {
            element[index].innerHTML = `<p class="profileHexCodes"> ${element[index].value}</p>`
        }
    })
    element[index].addEventListener("mouseleave", function(){
        element[index].innerHTML = ''
    })
}
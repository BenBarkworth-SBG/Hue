function componentToHex(c) {
    // converts number to a string using base 16
    let hex = c.toString(16);
    //console.log(hex)

    // if hex length is 1 add 0 in front otherwise return hex
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

let outputs = document.getElementById('outputs');

function colors(){
    let red = document.getElementById('red').value;
    let green = document.getElementById('green').value;
    let blue = document.getElementById('blue').value;

    document.getElementById('output').innerHTML = 'rgb(' + red + ',' + green + ',' + blue + ')';
    let convRed = parseInt(red)
    let convBlue = parseInt(blue)
    let convGreen = parseInt(green)
    let test = rgbToHex(convRed, convGreen, convBlue);
    console.log(test)
    document.getElementById('hexOutput').innerHTML = 'hex(' + test + ')';

    outputs.style.backgroundColor = 'rgb(' + convRed + ',' + convGreen + ',' + convBlue + ')';
}
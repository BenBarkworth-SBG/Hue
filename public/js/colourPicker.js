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
    let generateTest = generatePalettes(test)

    outputs.style.backgroundColor = 'rgb(' + convRed + ',' + convGreen + ',' + convBlue + ')';
    return test
}

function generatePalettes(hexInput) {
  // Get checkbox states
  const monochromatic = document.getElementById('monochromaticCheckbox');
  const complementary = document.getElementById('complementaryCheckbox');
  const analogous = document.getElementById('analogousCheckbox');
  // button values
  const rgbValue = document.getElementById('output').value;
  const hexValue = document.getElementById('hexOutput').value;
  const value = hexInput
  console.log(rgbValue)
  console.log(hexValue)
  console.log(value)
  console.log(monochromatic.checked)

  // Container for displaying color palettes
  const paletteContainer = document.getElementById('paletteContainer');

  // Clear previous palettes
  paletteContainer.style.backgroundColor = "";

  // The generator button doesn't recognise checkbox is ticked

  // Generate and display selected color palettes inside the grey box
  if (monochromatic.checked)
    paletteContainer.style.backgroundColor = value;
      // Generate and display monochromatic palette here
  if (complementary.checked) {
    paletteContainer.style.backgroundColor = value;
      // Generate and display complementary palette here
  }
  if (analogous.checked) {
    paletteContainer.style.backgroundColor = value;
      // Generate and display analogous palette here
  }
}

// implement the following functions within generate palettes function above

const colorPicker = document.getElementById('colorPicker');
const colorPalette = document.getElementById('colorPalette');
colorPicker.addEventListener('input', updatePalette);

function updatePalette() {
    const baseColor = colorPicker.value;
    const palette = generateMonochromePalette(baseColor);
    // Clear previous swatches
    colorPalette.innerHTML = '';
    // Create and append swatches to the palette
    palette.forEach(color => {
        const swatch = document.createElement('div');
        swatch.style.backgroundColor = color;
        swatch.className = 'swatch';
        colorPalette.appendChild(swatch);
    });
}
function generateMonochromePalette(baseColor) {
    const palette = [];
    // Generate 5 shades of the base color
    for (let i = 0; i < 5; i++) {
        const shade = lightenColor(baseColor, i * 10);
        palette.push(shade);
    }
    return palette;
}
function lightenColor(hex, percent) {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const newR = Math.min(255, r + (percent * 2.55));
    const newG = Math.min(255, g + (percent * 2.55));
    const newB = Math.min(255, b + (percent * 2.55));
    const newHex = `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
    return newHex;
}
// Initialize the palette with the default color
updatePalette();
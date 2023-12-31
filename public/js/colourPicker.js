let outputs = document.getElementById('outputs');
// Get checkbox states
const monochromatic = document.getElementById('monochromaticCheckbox');
const complementary = document.getElementById('complementaryCheckbox');
const analogous = document.getElementById('analogousCheckbox');
const split = document.getElementById('splitCheckbox');
// Container for displaying color palettes
const monochromaticContainer = document.getElementById('monochromaticContainer');
const complementaryContainer = document.getElementById('complementaryContainer');
const analogousContainer = document.getElementById('analogousContainer');
const splitContainer = document.getElementById('splitContainer');
// Hides save palette buttons
document.getElementById("monochromatic").style.display = "none";
document.getElementById("complementary").style.display = "none";
document.getElementById("analogous").style.display = "none";
document.getElementById("split").style.display = "none";
// generate palette button
let paletteGeneratorBtn = document.getElementById("paletteGenBtn")
let checkboxSet = new Set();
let hoverAlertNum = 0

// colour converter
function colors(){
    let red = document.getElementById('red').value;
    let green = document.getElementById('green').value;
    let blue = document.getElementById('blue').value;
    document.getElementById('output').innerHTML = 'rgb(' + red + ',' + green + ',' + blue + ')';
    let rgbConversion = rgbToHex(red, green, blue);
    document.getElementById('hexOutput').innerHTML = 'hex(' + rgbConversion + ')';
    let HexConversion = hexToHsl(rgbConversion)
    document.getElementById('hslOutput').innerHTML = `hsl(${Math.floor(HexConversion.h)}, ${Math.floor(HexConversion.s)}%, ${Math.floor(HexConversion.l)}%)`;
    let cwykConversion = rgbToCmyk(red, green, blue)
    document.getElementById('cwykOutput').innerHTML = 'cwyk(' + cwykConversion + ')';
    outputs.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
    return rgbConversion
}

// generate palette master function
function generatePalettes() {
  const hexCodeOutside = document.getElementById('hex-code-outside');
  let value; 
  if (hexCodeOutside !== null) {
    value = hexCodeOutside.innerText;
  }
  else {
    value = colors();
  }
  if (value === '') {
    alert("Please select a colour.")
    return;
  }
  let checkboxArray = Array.from(checkboxSet)
  let palettes;

  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray[i] == "monochromatic") {
      palettes = generateMonochromePalette(value)
      monochromaticContainer.innerHTML = '';
    
      document.getElementById("monochromatic").style.display = "inline-block";
    }
    if (checkboxArray[i] == "complementary") {
      const complementaryColor = getComplementaryColor(value);
      palettes = generateComplementaryPalette(value, complementaryColor);
      complementaryContainer.innerHTML = '';
      document.getElementById("complementary").style.display = "inline-block";
    }
    if (checkboxArray[i] == "analogous") {
      palettes = generateAnalogousPalette(value)
      analogousContainer.innerHTML = '';
      document.getElementById("analogous").style.display = "inline-block";
    }
    if (checkboxArray[i] == "split") {
      const complementaryColor = getComplementaryColor(value);
      palettes = generateSplitComplementaryPalette(value, complementaryColor)
      splitContainer.innerHTML = '';
      document.getElementById("split").style.display = "inline-block";
    }

    palettes.forEach(color => {
      const element = document.createElement('div');
      element.style.backgroundColor = color;
      element.value = color
      element.style.width = "20%"
      element.style.height = "100px"
      element.className = 'swatch';
      let hexConversion = hexToRgb(color);
      let rgbConversion = rgbToCmyk(hexConversion[0], hexConversion[1], hexConversion[2])
      let blackValue = rgbConversion[3]
      element.addEventListener("mouseenter", function(){
        // this applies CSS class to div innerHTML
        if (blackValue > 80) {
          element.innerHTML = `<p class="lightColours"> ${element.value}</p>`
        }
        else {
          element.innerHTML = `<p class="darkColours"> ${element.value}</p>`
        }
      })
      element.addEventListener("mouseleave", function(){
        element.innerHTML = ''
      })
      containerChosen = String(checkboxArray[i] + "Container")
      // applies append child method to the palette container specified by the user
      window[containerChosen].appendChild(element);
    });
  }
  if (hoverAlertNum < 1) {
    alert("Hover over the colours to see the corresponding hex code.")
  }
  hoverAlertNum += 1
}

// function to disable or enable checkboxes
function checkboxChecker(paletteType) {
  // value from checkbox option clicked
  let value = paletteType.value
  if (paletteType.checked) {
    checkboxSet.add(value);
  }
  else {
    checkboxSet.delete(value)
  }
  paletteGeneratorBtn.disabled = false;
  if (checkboxSet.size < 1) {
    paletteGeneratorBtn.disabled = true;
  }
  return checkboxSet;
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
    // adds a percentage of brightness
    const newR = Math.min(255, r + (percent * 2.55));
    const newG = Math.min(255, g + (percent * 2.55));
    const newB = Math.min(255, b + (percent * 2.55));
    // constructs hex by rounding values, converting to hex and prepending with zero if needed
    const newHex = `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
    return newHex;
}

function generateComplementaryPalette(baseColor, complementaryColor) {
  const palette = [];
  // Generate shades of the base color
  for (let i = 0; i < 3; i++) {
      const shade = lightenColor(baseColor, i * 10);
      palette.push(shade);
  }
  // Generate shades of the complementary color
  for (let i = 0; i < 2; i++) {
      const shade = lightenColor(complementaryColor, i * 10);
      palette.push(shade);
  }
  return palette;
}

function getComplementaryColor(hex) {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const newR = 255 - r;
  const newG = 255 - g;
  const newB = 255 - b;
  const newHex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  return newHex;
}

function generateAnalogousPalette(baseColor) {
  const palette = [];
  // Convert the base color to HSL
  const hsl = hexToHsl(baseColor);

  // Generate analogous colors by varying the hue
  for (let i = -2; i <= 2; i++) {
      const newHue = (hsl.h + i * 30) % 360;
      const newHex = hslToHex({ h: newHue, s: hsl.s, l: hsl.l });
      palette.push(newHex);
  }
  return palette;
}

function hexToHsl(hex) {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const rNormalized = r / 255;
  const gNormalized = g / 255;
  const bNormalized = b / 255;
  const max = Math.max(rNormalized, gNormalized, bNormalized);
  const min = Math.min(rNormalized, gNormalized, bNormalized);

  // Calculate lightness (l)
  let h, s, l = (max + min) / 2;
  // check if colour has no hue
  if (max === min) {
      h = s = 0;

  } else {
    // calculate saturation
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      // checks for highest r, g or b value
      switch (max) {
          case rNormalized:
              // handles hue scale circular nature
              h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
              break;
          case gNormalized:
              h = (bNormalized - rNormalized) / d + 2;
              break;
          case bNormalized:
              h = (rNormalized - gNormalized) / d + 4;
              break;
      }
      // normalisation
      h /= 6;
  }
  // convert to hsl
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(hsl) {
  // normalisation
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  // helper function to calculate hue
  const calcHue = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
  };

  // variable for when lightness is below 0.5
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  // intermediate value for extreme saturation
  const p = 2 * l - q;
  // accounting for different hue angles
  const red = Math.round(calcHue(p, q, h + 1 / 3) * 255);
  const green = Math.round(calcHue(p, q, h) * 255);
  const blue = Math.round(calcHue(p, q, h - 1 / 3) * 255);
  const conversion = rgbToHex(red,green,blue)
  return conversion
}

function generateSplitComplementaryPalette(baseColour, complementaryColor) {
    const palette = [];
    // Calculate split complementary colors based on the complementary color
    // Rotate by 30 degrees
    const firstSplitColor = rotateColor(complementaryColor, 30);
    // Rotate by -30 degrees
    const secondSplitColor = rotateColor(complementaryColor, -30);
    // Include the complementary color and two split complementary colors
    palette.push(baseColour, firstSplitColor, secondSplitColor);

    // Calculate two more split complementary colors
    // Rotate the first split color by 30 degrees
    const thirdSplitColor = rotateColor(firstSplitColor, 30);
     // Rotate the second split color by -30 degrees
    const fourthSplitColor = rotateColor(secondSplitColor, -30);
    palette.push(thirdSplitColor, fourthSplitColor);
    return palette;
}

function rotateColor(hex, degrees) {
    const hslColor = hexToHsl(hex);
    hslColor.h = (hslColor.h + degrees) % 360;
    return splitHslToHex(hslColor);
}

function splitHslToHex(hsl) {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    let r, g, b;

     // achromatic / no hue
    if (s === 0) {
        r = g = b = l;
    } else {
        // helper function
        const hue2rgb = (p, q, t) => {
            // normalisation
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        // intermediate values
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}

// random colour generator
function generateRandomPalette() {
    // Generate random RGB values for the base colour
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);
    // Set the random RGB values to the input fields
    document.getElementById('red').value = randomRed;
    document.getElementById('green').value = randomGreen;
    document.getElementById('blue').value = randomBlue;
    let paletteChosen;
    if (checkboxSet.size < 1) {
      // list of palettes
      const paletteList = ["monochromatic", "complementary", "analogous", "split"]
      // random num to iterate through list
      let randomNum = Math.floor(Math.random() * 4)
      paletteChosen = paletteList[randomNum]
      // add to checkbox set to be consistent
      checkboxSet.add(paletteChosen)
      let randomCheckbox = String(paletteChosen + "Checkbox")
      // applies checked method to the palette checkbox
      window[randomCheckbox].checked = true;
      // enables palette generator button
      paletteGeneratorBtn.disabled = false;
    }
    generatePalettes();
}
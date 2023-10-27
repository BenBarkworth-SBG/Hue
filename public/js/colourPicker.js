let outputs = document.getElementById('outputs');
// Get checkbox states
const monochromatic = document.getElementById('monochromaticCheckbox');
const complementary = document.getElementById('complementaryCheckbox');
const analogous = document.getElementById('analogousCheckbox');
const split = document.getElementById('splitCheckbox');
// Container for displaying color palettes
const paletteContainer = document.getElementById('paletteContainer');
const complementaryContainer = document.getElementById('complementary');
const analogousContainer = document.getElementById('analogous');
const splitContainer = document.getElementById('split');
// Hides save palette buttons
document.getElementById("monoBtn").style.display = "none";
document.getElementById("compBtn").style.display = "none";
document.getElementById("analogousBtn").style.display = "none";
document.getElementById("splitBtn").style.display = "none";


function componentToHex(c) {
    // converts number to a string using base 16
    let hex = c.toString(16);
    // if hex length is 1 add 0 in front otherwise return hex
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

function colors(){
    let red = document.getElementById('red').value;
    let green = document.getElementById('green').value;
    let blue = document.getElementById('blue').value;

    document.getElementById('output').innerHTML = 'rgb(' + red + ',' + green + ',' + blue + ')';
    let convRed = parseInt(red)
    let convBlue = parseInt(blue)
    let convGreen = parseInt(green)
    let test = rgbToHex(convRed, convGreen, convBlue);
    document.getElementById('hexOutput').innerHTML = 'hex(' + test + ')';
    outputs.style.backgroundColor = 'rgb(' + convRed + ',' + convGreen + ',' + convBlue + ')';
    return test
}

function generatePalettes() {
  const value = colors()
  // button values
  // const rgbValue = document.getElementById('output').value;
  // const hexValue = document.getElementById('hexOutput').value;

  // Clear previous palettes
  paletteContainer.style.backgroundColor = "";

  // Generate and display selected color palettes inside the div
  if (monochromatic.checked) {
    checkboxChecker()
    const palettes = generateMonochromePalette(value)
    paletteContainer.innerHTML = '';
    palettes.forEach(color => {
      const element = document.createElement('div');
      element.style.backgroundColor = color;
      element.style.width = "20%"
      element.style.height = "100px"
      element.className = 'swatch';
      paletteContainer.appendChild(element);
    document.getElementById("monoBtn").style.display = "inline-block";
    });
  }
  if (complementary.checked) {
    checkboxChecker()
    const complementaryColor = getComplementaryColor(value);
    const palettes = generateComplementaryPalette(value, complementaryColor);
    complementaryContainer.innerHTML = '';
    palettes.forEach(color => {
      const element = document.createElement('div');
      element.style.backgroundColor = color;
      element.style.width = "20%"
      element.style.height = "100px"
      element.className = 'swatch';
      complementaryContainer.appendChild(element);
    document.getElementById("compBtn").style.display = "inline-block";
    });
  }
  if (analogous.checked) {
    checkboxChecker()
    const palettes = generateAnalogousPalette(value)
    analogousContainer.innerHTML = '';
    palettes.forEach(color => {
      const element = document.createElement('div');
      element.style.backgroundColor = color;
      element.style.width = "20%"
      element.style.height = "100px"
      element.className = 'swatch';
      analogousContainer.appendChild(element);
    document.getElementById("analogousBtn").style.display = "inline-block";
    });
  }
  if (split.checked) {
    checkboxChecker()
    const complementaryColor = getComplementaryColor(value);
    const palettes = generateSplitComplementaryPalette(complementaryColor)
    splitContainer.innerHTML = '';
    palettes.forEach(color => {
      const element = document.createElement('div');
      element.style.backgroundColor = color;
      element.style.width = "20%"
      element.style.height = "100px"
      element.className = 'swatch';
      splitContainer.appendChild(element);
    document.getElementById("splitBtn").style.display = "inline-block";
    });
  }
  checkboxChecker()
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
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h, s;

  if (max === min) {
      h = s = 0; // achromatic
  } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r:
              h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
              break;
          case g:
              h = ((b - r) / d + 2) / 6;
              break;
          case b:
              h = ((r - g) / d + 4) / 6;
              break;
      }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(hsl) {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  const calcHue = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const red = Math.round(calcHue(p, q, h + 1 / 3) * 255);
  const green = Math.round(calcHue(p, q, h) * 255);
  const blue = Math.round(calcHue(p, q, h - 1 / 3) * 255);
  return `#${(1 << 24 | red << 16 | green << 8 | blue).toString(16).slice(1).toUpperCase()}`;
}

// function to disable or enable checkboxes
function checkboxChecker() {
  if (monochromatic.checked) {
    document.getElementById("complementaryCheckbox").disabled = true;
    document.getElementById("analogousCheckbox").disabled = true;
    document.getElementById("splitCheckbox").disabled = true;
  }
  if (complementary.checked) {
    document.getElementById("monochromaticCheckbox").disabled = true;
    document.getElementById("analogousCheckbox").disabled = true;
    document.getElementById("splitCheckbox").disabled = true;
  }
  if (analogous.checked) {
    document.getElementById("monochromaticCheckbox").disabled = true;
    document.getElementById("complementaryCheckbox").disabled = true;
    document.getElementById("splitCheckbox").disabled = true;
  }
  if (split.checked) {
    document.getElementById("monochromaticCheckbox").disabled = true;
    document.getElementById("complementaryCheckbox").disabled = true;
    document.getElementById("analogousCheckbox").disabled = true;
  }
  if (!analogous.checked && !complementary.checked && !monochromatic.checked && !split.checked) {
    document.getElementById("monochromaticCheckbox").disabled = false;
    document.getElementById("complementaryCheckbox").disabled = false;
    document.getElementById("analogousCheckbox").disabled = false;
    document.getElementById("splitCheckbox").disabled = false;
  }
}

function resetColors() {
  // reset the input and span element values
  document.getElementById('red').value = 0;
  document.getElementById('green').value = 0;
  document.getElementById('blue').value = 0;
  document.getElementById('output').innerHTML = 'rgb(0, 0, 0)';
  document.getElementById('hexOutput').innerHTML = 'hex(#000000)';
  // Clear the palette containers
  paletteContainer.innerHTML = ''; 
  complementaryContainer.innerHTML = '';
  analogousContainer.innerHTML = '';
  randomContainer.innerHTML = '';
  // Clear the background color of the palette containers
  paletteContainer.style.backgroundColor = "";
  complementaryContainer.style.backgroundColor = "";
  analogousContainer.style.backgroundColor = "";
  randomContainer.style.backgroundColor = "";
  // reset colour output
  outputs.style.backgroundColor = 'rgb(0, 0, 0)';
  // Uncheck all checkboxes
  monochromatic.checked = false;
  complementary.checked = false;
  analogous.checked = false;
}

/////////////////////////

function updatePalette() {
    const baseColor = colorPicker.value;
    const complementaryColor = getComplementaryColor(baseColor);
    const splitComplementaryColors = generateSplitComplementaryPalette(baseColor, complementaryColor);

    // Clear previous swatches
    colorPalette.innerHTML = '';

    // Create and append swatches to the palette
    splitComplementaryColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.style.backgroundColor = color;
        swatch.className = 'swatch';
        colorPalette.appendChild(swatch);
    });
}

function generateSplitComplementaryPalette(complementaryColor) {
    const palette = [];
    // Calculate split complementary colors based on the complementary color
    const firstSplitColor = rotateColor(complementaryColor, 30); // Rotate by 30 degrees
    const secondSplitColor = rotateColor(complementaryColor, -30); // Rotate by -30 degrees
    
    // Include the complementary color and two split complementary colors
    palette.push(firstSplitColor, complementaryColor, secondSplitColor);

    // Calculate two more split complementary colors
    const thirdSplitColor = rotateColor(firstSplitColor, 30); // Rotate the first split color by 30 degrees
    const fourthSplitColor = rotateColor(secondSplitColor, -30); // Rotate the second split color by -30 degrees
    palette.push(thirdSplitColor, fourthSplitColor);

    return palette;
}

function rotateColor(hex, degrees) {
    const hslColor = hexToHsl(hex);
    hslColor.h = (hslColor.h + degrees) % 360;
    return splitHslToHex(hslColor);
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
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case rNormalized:
                h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
                break;
            case gNormalized:
                h = (bNormalized - rNormalized) / d + 2;
                break;
            case bNormalized:
                h = (rNormalized - gNormalized) / d + 4;
                break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

function splitHslToHex(hsl) {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
}
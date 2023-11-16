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


function componentToHex(c) {
    // converts number to a string using base 16
    let hex = c.toString(16);
    // if hex length is 1 add 0 in front otherwise return hex
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r, g, b) {
    let red = parseInt(r)
    let green = parseInt(g)
    let blue = parseInt(b)
    return "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);
  }

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  // let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  // hex = hex.replace(shorthandRegex, function(m, r, g, b) {
  //   return r + r + g + g + b + b;
  // });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  console.log(result)
  let r = parseInt(result[1], 16)
  let g = parseInt(result[2], 16)
  let b = parseInt(result[3], 16)
  rgbList= [r,g,b]
  return rgbList
}

function rgbToCmyk (r,g,b) {
  let c = 0;
  let m = 0;
  let y = 0;
  let k = 0;
  
  //remove spaces from input RGB values, convert to int
  let redNum = parseInt( (''+r).replace(/\s/g,''),10 ); 
  let greenNum = parseInt( (''+g).replace(/\s/g,''),10 ); 
  let blueNum = parseInt( (''+b).replace(/\s/g,''),10 ); 
  
  // if ( redNum==null || greenNum==null || blueNum==null ||
  //     isNaN(redNum) || isNaN(greenNum)|| isNaN(blueNum) )
  // {
  //   alert ('Please enter numeric RGB values!');
  //   return;
  // }
  // if (redNum<0 || greenNum<0 || blueNum<0 || redNum>255 || greenNum>255 || blueNum>255) {
  //   alert ('RGB values must be in the range 0 to 255.');
  //   return;
  // }
  
  // BLACK
  if (redNum==0 && greenNum==0 && blueNum==0) {
    k = 100;
    return [0,0,0,100];
  }
  
  c = 1 - (redNum/255);
  m = 1 - (greenNum/255);
  y = 1 - (blueNum/255);
  
  let minCMY = Math.min(c,
                Math.min(m,y));
  c = (c - minCMY) / (1 - minCMY) ;
  m = (m - minCMY) / (1 - minCMY) ;
  y = (y - minCMY) / (1 - minCMY) ;
  k = minCMY;

  cmykList = [c,m,y,k]

  for (let i = 0; i < cmykList.length; i++) {
    cmykList[i] = cmykList[i] * 100
    cmykList[i] = Math.round(cmykList[i])
  }
  return cmykList;
}

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

function generatePalettes() {
  const value = colors()
  let checkboxArray = Array.from(checkboxSet)
  let palettes;
  // let element = document.getElementsByClassName("swatch")

  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray[i] == "monochromatic") {
      // monochromaticContainer.style.backgroundColor = "";
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
  //   for (let i = 0; i < palettes.length; i++) {
  //     console.log(element)
  //     console.log(palettes[i])
  //     element[i].style.backgroundColor = palettes[i]
  // }

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

// function resetColors() {
//   // reset the input and span element values
//   document.getElementById('red').value = 0;
//   document.getElementById('green').value = 0;
//   document.getElementById('blue').value = 0;
//   document.getElementById('output').innerHTML = 'rgb(0, 0, 0)';
//   document.getElementById('hexOutput').innerHTML = 'hex(#000000)';
//   // Clear the palette containers
//   monochromaticContainer.innerHTML = ''; 
//   complementaryContainer.innerHTML = '';
//   analogousContainer.innerHTML = '';
//   splitContainer.innerHTML = '';
//   // Clear the background color of the palette containers
//   monochromaticContainer.style.backgroundColor = "";
//   complementaryContainer.style.backgroundColor = "";
//   analogousContainer.style.backgroundColor = "";
//   splitContainer.style.backgroundColor = "";
//   // reset colour output
//   outputs.style.backgroundColor = 'rgb(0, 0, 0)';
//   // Uncheck all checkboxes
//   monochromatic.checked = false;
//   complementary.checked = false;
//   analogous.checked = false;
//   split.checked = false;
//   paletteGeneratorBtn.disabled = true;
// }

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

// DUPLICATION
// function hexToHsl(hex) {
//   hex = hex.replace(/^#/, '');
//   const r = parseInt(hex.slice(0, 2), 16) / 255;
//   const g = parseInt(hex.slice(2, 4), 16) / 255;
//   const b = parseInt(hex.slice(4, 6), 16) / 255;
//   const max = Math.max(r, g, b);
//   const min = Math.min(r, g, b);
//   const l = (max + min) / 2;
//   let h, s;
//   if (max === min) {
//       h = s = 0; // achromatic
//   } else {
//       const d = max - min;
//       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//       switch (max) {
//           case r:
//               h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
//               break;
//           case g:
//               h = ((b - r) / d + 2) / 6;
//               break;
//           case b:
//               h = ((r - g) / d + 4) / 6;
//               break;
//       }
//   }
//   return { h: h * 360, s: s * 100, l: l * 100 };
// }

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

function generateSplitComplementaryPalette(baseColour, complementaryColor) {
    const palette = [];
    // Calculate split complementary colors based on the complementary color
    const firstSplitColor = rotateColor(complementaryColor, 30); // Rotate by 30 degrees
    const secondSplitColor = rotateColor(complementaryColor, -30); // Rotate by -30 degrees
    
    // Include the complementary color and two split complementary colors
    palette.push(baseColour, firstSplitColor, secondSplitColor);

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
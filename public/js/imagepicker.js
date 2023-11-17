const uploadInput = document.getElementById('upload');
    const previewImage = document.getElementById('preview');
    const colorPreview = document.getElementById('color-preview');
    const imgColorPreview = document.getElementById('img-color-preview');
    const colorBox = document.getElementById('color-box');
    const hexCode = document.getElementById('hex-code');
    const generatePaletteButton = document.getElementById('generate-palette-button');
    const generateAnalogousPaletteButton = document.getElementById('generate-analogous-palette-button');
    const generateComplimentaryPaletteButton = document.getElementById('generate-complimentary-palette-button');
    const colorPalette = document.getElementById('color-palette');
    const analogousPalette = document.getElementById('analogous-palette');
    const complimentaryPalette = document.getElementById('complimentary-palette');

    uploadInput.addEventListener('change', handleImageUpload);
    previewImage.addEventListener('mousemove', handleImageHover);
    previewImage.addEventListener('mouseleave', hideColorPreview);

    function handleImageUpload(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                previewImage.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }

   function handleImageHover(event) {
        const x = event.layerX;
        const y = event.layerY;

        const canvas = document.createElement('canvas');
        canvas.width = previewImage.width;
        canvas.height = previewImage.height;

        const context = canvas.getContext('2d');
        context.drawImage(previewImage, 0, 0, previewImage.width, previewImage.height);

        const pixel = context.getImageData(x, y, 1, 1).data;
        const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

        colorBox.style.backgroundColor = color;

        // Display the hex code inside the color preview
        const hexCodeElement = document.getElementById('hex-code');
        hexCodeElement.innerText = hex;
     
      const hexCodeElement2 = document.getElementById('hex-code2');
        hexCodeElement2.innerText = hex;
     
     hexCodeElement2.style.left = '70px'

        colorPreview.style.display = 'block';
        colorPreview.style.left = x + 'px';
        colorPreview.style.top = y + 'px';
    }
  
    function hideColorPreview() {
        colorPreview.style.display = 'none';
    }

    function rgbToHex(r, g, b) {
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    function generatePalette() {
        const baseColor = imgColorPreview.style.backgroundColor;
        const palette = generateMonochromaticPalette(baseColor, 5);

        colorPalette.innerHTML = '';
        palette.forEach(color => {
            const paletteColor = document.createElement('div');
            paletteColor.classList.add('palette-color');
            paletteColor.style.backgroundColor = color;
            colorPalette.appendChild(paletteColor);
        });
    }

    function generateAnalogousPalette() {
        const baseColor = imgColorPreview.style.backgroundColor;
        const palette = generateAnalogousColors(baseColor, 5);

        analogousPalette.innerHTML = '';
        palette.forEach(color => {
            const paletteColor = document.createElement('div');
            paletteColor.classList.add('palette-color');
            paletteColor.style.backgroundColor = color;
            analogousPalette.appendChild(paletteColor);
        });
    }

    function generateComplimentaryPalette() {
        const baseColor = imgColorPreview.style.backgroundColor;
        const palette = generateComplimentaryColors(baseColor, 5);

        complimentaryPalette.innerHTML = '';
        palette.forEach(color => {
            const paletteColor = document.createElement('div');
            paletteColor.classList.add('palette-color');
            paletteColor.style.backgroundColor = color;
            complimentaryPalette.appendChild(paletteColor);
        });
    }

    function handleImageClick() {
        const baseColor = colorBox.style.backgroundColor;
        imgColorPreview.style.backgroundColor = baseColor;
        imgColorPreview.style.display = 'inline-block';
    }

    function generateMonochromaticPalette(baseColor, count) {
        const palette = [];
        const baseHSL = rgbToHSL(parseRGB(baseColor));

        for (let i = 0; i < count; i++) {
            const modifiedHSL = { ...baseHSL };
            modifiedHSL.l = Math.min(100, modifiedHSL.l + (i * 10));

            const modifiedRGB = hslToRGB(modifiedHSL);
            const modifiedColor = rgbToHex(modifiedRGB.r, modifiedRGB.g, modifiedRGB.b);
            palette.push(modifiedColor);
        }

        return palette;
    }

    function generateAnalogousColors(baseColor, count) {
        const palette = [];
        const baseHSL = rgbToHSL(parseRGB(baseColor));

        for (let i = 0; i < count; i++) {
            const modifiedHSL = { ...baseHSL };
            modifiedHSL.h = (modifiedHSL.h + (i * 30)) % 360;

            const modifiedRGB = hslToRGB(modifiedHSL);
            const modifiedColor = rgbToHex(modifiedRGB.r, modifiedRGB.g, modifiedRGB.b);
            palette.push(modifiedColor);
        }

        return palette;
    }

    function generateComplimentaryColors(baseColor, count) {
        const palette = [];
        const baseHSL = rgbToHSL(parseRGB(baseColor));

        for (let i = 0; i < count; i++) {
            const modifiedHSL = { ...baseHSL };
            modifiedHSL.h = (modifiedHSL.h + 180) % 360;
            modifiedHSL.l = (modifiedHSL.l + (i * 20)) % 100; // Varying lightness

            const modifiedRGB = hslToRGB(modifiedHSL);
            const modifiedColor = rgbToHex(modifiedRGB.r, modifiedRGB.g, modifiedRGB.b);
            palette.push(modifiedColor);
        }

        return palette;
    }

    function parseRGB(rgbString) {
        const match = rgbString.match(/(\d+), (\d+), (\d+)/);
        return match ? { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) } : null;
    }

    function rgbToHSL(rgb) {
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    function hslToRGB(hsl) {
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

        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }
   const generateSplitComplimentaryPaletteButton = document.getElementById('generate-split-complimentary-palette-button');
    const splitComplimentaryPalette = document.getElementById('split-complimentary-palette');

    generateSplitComplimentaryPaletteButton.addEventListener('click', generateSplitComplimentaryPalette);

    function generateSplitComplimentaryPalette() {
        const baseColor = imgColorPreview.style.backgroundColor;
        const palette = generateSplitComplimentaryColors(baseColor, 4);

        splitComplimentaryPalette.innerHTML = '';
        palette.forEach(color => {
            const paletteColor = document.createElement('div');
            paletteColor.classList.add('palette-color');
            paletteColor.style.backgroundColor = color;
            splitComplimentaryPalette.appendChild(paletteColor);
        });
    }

    function generateSplitComplimentaryColors(baseColor, count) {
        const palette = [];
        const baseHSL = rgbToHSL(parseRGB(baseColor));

        // Adjust the angles to get split-complementary colors
        const angle1 = (baseHSL.h + 150) % 360;
        const angle2 = (baseHSL.h + 210) % 360;

        palette.push(baseColor);
        
        for (let i = 1; i <= count; i++) {
            const modifiedHSL = { ...baseHSL };

            if (i % 2 === 1) {
                modifiedHSL.h = (angle1 + (i - 1) * 30) % 360;
            } else {
                modifiedHSL.h = (angle2 - (i - 2) * 30) % 360;
            }

            const modifiedRGB = hslToRGB(modifiedHSL);
            const modifiedColor = rgbToHex(modifiedRGB.r, modifiedRGB.g, modifiedRGB.b);
            palette.push(modifiedColor);
        }

        return palette;
    }
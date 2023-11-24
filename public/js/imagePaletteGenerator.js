//image page changes 
const uploadInput = document.getElementById('upload');
const previewImage = document.getElementById('preview');
const colorPreview = document.getElementById('color-preview');
const imgColorPreview = document.getElementById('img-color-preview');
const colorBox = document.getElementById('color-box');
const hexCode = document.getElementById('hex-code');
const hexCodeOutside = document.getElementById('hex-code-outside');
uploadInput.addEventListener('change', handleImageUpload); 
previewImage.addEventListener('mousemove', handleImageHover);
previewImage.addEventListener('mouseleave', hideColorPreview);
imgColorPreview.addEventListener('click', handleImageClick);

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
  hexCode.innerText = hex;

  colorPreview.style.display = 'block';
  colorPreview.style.left = x + 'px';
  colorPreview.style.top = y + 'px';
}


function hideColorPreview() {
    colorPreview.style.display = 'none';
}

function handleImageClick() {
  const baseColor = colorBox.style.backgroundColor;
  imgColorPreview.style.backgroundColor = baseColor;
  imgColorPreview.style.display = 'inline-block';

  // Set the hex code outside to the same value as hex code
  hexCodeOutside.innerText = hexCode.innerText;
  hexCodeOutside.style.display = 'inline-block';
}
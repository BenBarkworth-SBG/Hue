function componentToHex(c) {
    // converts number to hex string using base 16
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
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
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
  
  // black value setting to avoid issue with zero division
  if (redNum==0 && greenNum==0 && blueNum==0) {
    k = 100;
    return [0,0,0,100];
  }
  
  // calculating CMY values
  c = 1 - (redNum/255);
  m = 1 - (greenNum/255);
  y = 1 - (blueNum/255);
  
  // Find the minimum of the CMY values
  let minCMY = Math.min(c, Math.min(m,y));

  // Normalising
  c = (c - minCMY) / (1 - minCMY) ;
  m = (m - minCMY) / (1 - minCMY) ;
  y = (y - minCMY) / (1 - minCMY) ;
  k = minCMY;

  // convert to percentage and round
  let cmykList = [c,m,y,k]
  for (let i = 0; i < cmykList.length; i++) {
    cmykList[i] = cmykList[i] * 100
    cmykList[i] = Math.round(cmykList[i])
  }
  return cmykList;
}
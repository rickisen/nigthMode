// var links = document.getElementsByTagName('link');
//
// for (var i = 0, len = links.length; i < len; i++) {
//   if (links[i].getAttribute('rel') == 'stylesheet') {
//     console.log(links[i]);
//   }
// }

var cssPropsToChange = [
  'color',
  'backgroundColor',
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'outlineColor'
];

document.addEventListener('keyup', function(e) {
  switch (e.keyCode) {
    case 78:
      applyEffect();
      break;
  }
});

function applyEffect() {
  // get all the elements,
  // loop through in reverse since we need to
  // apply the effect on the leaves on the DOM tree first to
  // counteract the casading effect of css.
  // var allElements = document.querySelectorAll('*');
  var allElements = document.getElementsByTagName('*');
  for (i = allElements.length - 1; i >= 0 ; i--) {
    let element      = allElements[i];
    let currentStyle = getComputedStyle(element);

    cssPropsToChange.forEach(function(prop, i) {
      // only change the color of it if has a set color
      if (isRgbString(currentStyle[prop])) {
        element.style[prop] = invertLuma(rgbStringToInt(currentStyle[prop]));
      }
    });
  }
}

function isRgbString(suspect) {
  return suspect.lastIndexOf('rgb(', 0) === 0;
}

function rgbStringToInt(color) {
  // extract the rgb value to array with ints
  var colorSplit = color.split(',');
  var r = 0 + parseInt(colorSplit[0].substr(4).trim());
  var g = 0 + parseInt(colorSplit[1].trim());
  var b = 0 + parseInt(colorSplit[2].replace(')', ' ').trim());

  return [r, g, b];
}

function invertLuma(rgbArr) {
  r = rgbArr[0];
  g = rgbArr[1];
  b = rgbArr[2];

  //convert to hsl
  var originalHsl = rgbToHsl(r, g, b);

  //invert it
  var darkenedHsl = [originalHsl[0], originalHsl[1], 1.0 - originalHsl[2]] ;

  // convert back to rgb
  var darkenedRgb = hslToRgb(darkenedHsl[0], darkenedHsl[1], darkenedHsl[2]);

  //return it in string form
  return 'rgb(' + darkenedRgb[0] + ', ' + darkenedRgb[1] + ', ' + darkenedRgb[2] + ')';
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 */
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = (max + min) / 2;
  var s = (max + min) / 2;
  var l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) {t += 1;}
      if (t > 1) {t -= 1;}
      if (t < 1 / 6) {return p + (q - p) * 6 * t;}
      if (t < 1 / 2) {return q; }
      if (t < 2 / 3) {return p + (q - p) * (2 / 3 - t) * 6;}
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 */
function rgbToHsv(r, g, b) {
  r = r / 255, g = g / 255, b = b / 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = max;
  var s = max;
  var v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, v];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 */
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [r * 255, g * 255, b * 255];
}


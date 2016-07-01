import { isRgbString } from '../Classes/RgbString';
import * as ColorConverter from '../Tools/ColorConverter';

export default class Color {
  constructor(colorString) {

    if (!isRgbString(colorString)) {
      let colorArr = ColorConverter.hexToRgb(colorString);
      this.r = colorArr[0];
      this.g = colorArr[1];
      this.b = colorArr[2];
    } else {
      var colorSplit = colorString.split(',');
      this.r = 0 + parseInt(colorSplit[0].substr(4).trim());
      this.g = 0 + parseInt(colorSplit[1].trim());
      this.b = 0 + parseInt(colorSplit[2].replace(')', ' ').trim());
    }
  }

  invertLuma() {
    // convert to hsl
    var originalHsl = ColorConverter.rgbToHsl(this.r, this.g, this.b);

    // invert it
    var darkenedHsl = [originalHsl[0], originalHsl[1], 1.0 - originalHsl[2]] ;

    // convert back to rgb
    var darkenedRgb = ColorConverter.hslToRgb(darkenedHsl[0], darkenedHsl[1], darkenedHsl[2]);

    // return it in string form
    return 'rgb(' + darkenedRgb[0] + ', ' + darkenedRgb[1] + ', ' + darkenedRgb[2] + ')';
  }
}

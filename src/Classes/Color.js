import * as ColorConverter from '../Tools/ColorConverter';

export default class Color {
  constructor(colorString) {
    // extract the rgb values
    // for now assume every colorString is in the form of 'rgb(40, 40, 40)'
    var colorSplit = colorString.split(',');
    this.r = 0 + parseInt(colorSplit[0].substr(4).trim());
    this.g = 0 + parseInt(colorSplit[1].trim());
    this.b = 0 + parseInt(colorSplit[2].replace(')', ' ').trim());
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

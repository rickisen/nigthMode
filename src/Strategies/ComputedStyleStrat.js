import { isRgbString } from '../Classes/RgbString';
import Color         from '../Classes/Color';

export default class ComputedStyleStrat {
  constructor() {
    this.cssPropsToChange = [
      'color',
      'background-color',
      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'outline-color'
    ];
  }

  applyEffect() {
    // get all the elements,
    // loop through in reverse since we need to
    // apply the effect on the leaves on the DOM tree first to
    // counteract the casading effect of css.
    var allElements = document.getElementsByTagName('*'); //diffence with querySelector?
    for (var i = allElements.length - 1; i >= 0 ; i--) {
      let element      = allElements[i];
      let currentStyle = getComputedStyle(element);

      this.cssPropsToChange.forEach(function(prop, i) {
        // only change the color of it if has a color
        if (isRgbString(currentStyle[prop])) {
          let color = new Color(currentStyle[prop]);
          element.style.setProperty([prop], color.invertLuma(), 'important');
        }
      });
    }
  }
}


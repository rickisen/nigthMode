import Color           from '../Classes/Color';

export default class InjectConvertedCss {
  constructor() {
    var sheets = document.styleSheets;
    this.origStylesheet = '' ;
    this.convertedStylesheet = '' ;
    this.cssPropsToChange = [
      'color',
      'background',
      'background-color',
      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'outline-color'
    ];

    for (var i = 0, slen = sheets.length; i < slen; i++) {
      console.log('loop number: ', i);
      if (sheets[i] && sheets[i].rules) {
        for (var j = 0, rlen = sheets[i].rules.length; j < rlen; j++) {
          if (sheets[i].rules[j].style && sheets[i].rules[j].cssText.indexOf('color') > -1 ) {
            this.origStylesheet += sheets[i].rules[j].cssText + '\n';
          }
        }
      }
    }

    this.applyEffect();
  }

  convertText() {
    // stylesheet.replace(/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/g, (orig) => {
    this.convertedStylesheet = this.origStylesheet.replace(/rgba?\([^)]+\)/g, (orig) => {
      let color = new Color(orig);
      return color.invertLuma();
    });
    // ));
  }

  applyEffect() {
    this.convertText();

    let elem = document.createElement('style');
    elem.type = 'text/css';

    if (elem.styleSheet) {
      elem.styleSheet.cssText = this.convertedStylesheet;
    } else {
      elem.appendChild(document.createTextNode(this.convertedStylesheet));
    }

    document.head.appendChild(elem);
  }
}


import Color           from '../Classes/Color';
import fetch           from 'isomorphic-fetch';

export default class InjectConvertedCss {
  constructor() {
    var links = document.getElementsByTagName('link');
    this.stylesheets = [];
    this.convertedStylesheets = [];

    var stylesheetURIs = [];
    for (var i = 0, len = links.length; i < len; i++) {
      let link = links[i];
      if (link.getAttribute('rel') == 'stylesheet') {
        stylesheetURIs.push(link.getAttribute('href'));
      }
    }

    // TDOD: find a better solution than fetch
    stylesheetURIs.map((URI) => {
      fetch(URI).then((responce) => {
        responce.text().then((text) => (
          this.stylesheets.push(text)
        ));
      });
    });
  }

  convertText() {
    this.convertedStylesheets = this.stylesheets.map((stylesheet) => (
      stylesheet.replace(/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/g, (orig) => {
        let color = new Color(orig);
        return color.invertLuma();
      })
    ));
  }

  applyEffect() {
    this.convertText();

    this.convertedStylesheets.map((convertedSS) => {
      let elem = document.createElement('style');
      elem.type = 'text/css';

      if (elem.styleSheet) {
        elem.styleSheet.cssText = convertedSS;
      } else {
        elem.appendChild(document.createTextNode(convertedSS));
      }

      document.head.appendChild(elem);
    });
  }
}


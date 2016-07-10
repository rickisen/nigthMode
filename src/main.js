import ComputedStyleStrat from './Strategies/ComputedStyleStrat';
import InjectConvertedCss from './Strategies/InjectConvertedCss.js';
import redeclareDefaultColors from './Strategies/redeclareDefaultColors.js';

var strat = false;
init();

function init() {
  document.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
      case 78: // n-key
        strat = new redeclareDefaultColors();
        strat = new InjectConvertedCss();
        break;
    }
  });
}

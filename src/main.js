import ComputedStyleStrat from './Strategies/ComputedStyleStrat';
import InjectConvertedCss from './Strategies/InjectConvertedCss.js';

var strat = new InjectConvertedCss();
init();

function init() {
  document.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
      case 78: // n-key
        // var strat = new ComputedStyleStrat();
        strat.applyEffect();
        break;
    }
  });
}

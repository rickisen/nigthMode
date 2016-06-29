import ComputedStyleStrat from './Strategies/ComputedStyleStrat';

init();

function init() {
  document.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
      case 78: // n-key
        var strat = new ComputedStyleStrat();
        strat.applyEffect();
        break;
    }
  });
}

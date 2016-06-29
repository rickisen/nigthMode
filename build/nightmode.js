(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ColorConverter = require('../Tools/ColorConverter');

var ColorConverter = _interopRequireWildcard(_ColorConverter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = function () {
  function Color(colorString) {
    _classCallCheck(this, Color);

    // extract the rgb values
    // for now assume every colorString is in the form of 'rgb(40, 40, 40)'
    var colorSplit = colorString.split(',');
    this.r = 0 + parseInt(colorSplit[0].substr(4).trim());
    this.g = 0 + parseInt(colorSplit[1].trim());
    this.b = 0 + parseInt(colorSplit[2].replace(')', ' ').trim());
  }

  _createClass(Color, [{
    key: 'invertLuma',
    value: function invertLuma() {
      // convert to hsl
      var originalHsl = ColorConverter.rgbToHsl(this.r, this.g, this.b);

      // invert it
      var darkenedHsl = [originalHsl[0], originalHsl[1], 1.0 - originalHsl[2]];

      // convert back to rgb
      var darkenedRgb = ColorConverter.hslToRgb(darkenedHsl[0], darkenedHsl[1], darkenedHsl[2]);

      // return it in string form
      return 'rgb(' + darkenedRgb[0] + ', ' + darkenedRgb[1] + ', ' + darkenedRgb[2] + ')';
    }
  }]);

  return Color;
}();

exports.default = Color;

},{"../Tools/ColorConverter":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isRgbString(suspect) {
  return suspect.lastIndexOf('rgb(', 0) === 0;
}

exports.isRgbString = isRgbString;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RgbString = require('../Classes/RgbString');

var _Color = require('../Classes/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComputedStyleStrat = function () {
  function ComputedStyleStrat() {
    _classCallCheck(this, ComputedStyleStrat);

    this.cssPropsToChange = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor'];
  }

  _createClass(ComputedStyleStrat, [{
    key: 'applyEffect',
    value: function applyEffect() {
      var _this = this;

      // get all the elements,
      // loop through in reverse since we need to
      // apply the effect on the leaves on the DOM tree first to
      // counteract the casading effect of css.
      var allElements = document.getElementsByTagName('*'); //diffence with querySelector?

      var _loop = function _loop() {
        var element = allElements[i];
        var currentStyle = getComputedStyle(element);

        _this.cssPropsToChange.forEach(function (prop, i) {
          // only change the color of it if has a color
          if ((0, _RgbString.isRgbString)(currentStyle[prop])) {
            var color = new _Color2.default(currentStyle[prop]);
            element.style[prop] = color.invertLuma();
          }
        });
      };

      for (var i = allElements.length - 1; i >= 0; i--) {
        _loop();
      }
    }
  }]);

  return ComputedStyleStrat;
}();

exports.default = ComputedStyleStrat;

},{"../Classes/Color":1,"../Classes/RgbString":2}],4:[function(require,module,exports){
// var links = document.getElementsByTagName('link');
//
// for (var i = 0, len = links.length; i < len; i++) {
//   if (links[i].getAttribute('rel') == 'stylesheet') {
//     console.log(links[i]);
//   }
// }
"use strict";

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbToHsl = rgbToHsl;
exports.hue2rgb = hue2rgb;
exports.hslToRgb = hslToRgb;
exports.rgbToHsv = rgbToHsv;
exports.hsvToRgb = hsvToRgb;
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h,
      s,
      l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);break;
      case g:
        h = (b - r) / d + 2;break;
      case b:
        h = (r - g) / d + 4;break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b) {
  r = r / 255, g = g / 255, b = b / 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h,
      s,
      v = max;

  var d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);break;
      case g:
        h = (b - r) / d + 2;break;
      case b:
        h = (r - g) / d + 4;break;
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
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;break;
    case 1:
      r = q, g = v, b = p;break;
    case 2:
      r = p, g = v, b = t;break;
    case 3:
      r = p, g = q, b = v;break;
    case 4:
      r = t, g = p, b = v;break;
    case 5:
      r = v, g = p, b = q;break;
  }

  return [r * 255, g * 255, b * 255];
}

},{}],6:[function(require,module,exports){
'use strict';

var _ComputedStyleStrat = require('./Strategies/ComputedStyleStrat');

var _ComputedStyleStrat2 = _interopRequireDefault(_ComputedStyleStrat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

init();

function init() {
  document.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
      case 78:
        // n-key
        var strat = new _ComputedStyleStrat2.default();
        strat.applyEffect();
        break;
    }
  });
}

},{"./Strategies/ComputedStyleStrat":3}]},{},[1,2,3,4,5,6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2xhc3Nlcy9Db2xvci5qcyIsInNyYy9DbGFzc2VzL1JnYlN0cmluZy5qcyIsInNyYy9TdHJhdGVnaWVzL0NvbXB1dGVkU3R5bGVTdHJhdC5qcyIsInNyYy9TdHJhdGVnaWVzL0luamVjdENvbnZlcnRlZENzcy5qcyIsInNyYy9Ub29scy9Db2xvckNvbnZlcnRlci5qcyIsInNyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7SUFBWSxjOzs7Ozs7SUFFUyxLO0FBQ25CLGlCQUFZLFdBQVosRUFBeUI7QUFBQTs7OztBQUd2QixRQUFJLGFBQWEsWUFBWSxLQUFaLENBQWtCLEdBQWxCLENBQWpCO0FBQ0EsU0FBSyxDQUFMLEdBQVMsSUFBSSxTQUFTLFdBQVcsQ0FBWCxFQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFBd0IsSUFBeEIsRUFBVCxDQUFiO0FBQ0EsU0FBSyxDQUFMLEdBQVMsSUFBSSxTQUFTLFdBQVcsQ0FBWCxFQUFjLElBQWQsRUFBVCxDQUFiO0FBQ0EsU0FBSyxDQUFMLEdBQVMsSUFBSSxTQUFTLFdBQVcsQ0FBWCxFQUFjLE9BQWQsQ0FBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsSUFBaEMsRUFBVCxDQUFiO0FBQ0Q7Ozs7aUNBRVk7O0FBRVgsVUFBSSxjQUFjLGVBQWUsUUFBZixDQUF3QixLQUFLLENBQTdCLEVBQWdDLEtBQUssQ0FBckMsRUFBd0MsS0FBSyxDQUE3QyxDQUFsQjs7O0FBR0EsVUFBSSxjQUFjLENBQUMsWUFBWSxDQUFaLENBQUQsRUFBaUIsWUFBWSxDQUFaLENBQWpCLEVBQWlDLE1BQU0sWUFBWSxDQUFaLENBQXZDLENBQWxCOzs7QUFHQSxVQUFJLGNBQWMsZUFBZSxRQUFmLENBQXdCLFlBQVksQ0FBWixDQUF4QixFQUF3QyxZQUFZLENBQVosQ0FBeEMsRUFBd0QsWUFBWSxDQUFaLENBQXhELENBQWxC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dGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgQ29sb3JDb252ZXJ0ZXIgZnJvbSAnLi4vVG9vbHMvQ29sb3JDb252ZXJ0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvciB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yU3RyaW5nKSB7XG4gICAgLy8gZXh0cmFjdCB0aGUgcmdiIHZhbHVlc1xuICAgIC8vIGZvciBub3cgYXNzdW1lIGV2ZXJ5IGNvbG9yU3RyaW5nIGlzIGluIHRoZSBmb3JtIG9mICdyZ2IoNDAsIDQwLCA0MCknXG4gICAgdmFyIGNvbG9yU3BsaXQgPSBjb2xvclN0cmluZy5zcGxpdCgnLCcpO1xuICAgIHRoaXMuciA9IDAgKyBwYXJzZUludChjb2xvclNwbGl0WzBdLnN1YnN0cig0KS50cmltKCkpO1xuICAgIHRoaXMuZyA9IDAgKyBwYXJzZUludChjb2xvclNwbGl0WzFdLnRyaW0oKSk7XG4gICAgdGhpcy5iID0gMCArIHBhcnNlSW50KGNvbG9yU3BsaXRbMl0ucmVwbGFjZSgnKScsICcgJykudHJpbSgpKTtcbiAgfVxuXG4gIGludmVydEx1bWEoKSB7XG4gICAgLy8gY29udmVydCB0byBoc2xcbiAgICB2YXIgb3JpZ2luYWxIc2wgPSBDb2xvckNvbnZlcnRlci5yZ2JUb0hzbCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcblxuICAgIC8vIGludmVydCBpdFxuICAgIHZhciBkYXJrZW5lZEhzbCA9IFtvcmlnaW5hbEhzbFswXSwgb3JpZ2luYWxIc2xbMV0sIDEuMCAtIG9yaWdpbmFsSHNsWzJdXSA7XG5cbiAgICAvLyBjb252ZXJ0IGJhY2sgdG8gcmdiXG4gICAgdmFyIGRhcmtlbmVkUmdiID0gQ29sb3JDb252ZXJ0ZXIuaHNsVG9SZ2IoZGFya2VuZWRIc2xbMF0sIGRhcmtlbmVkSHNsWzFdLCBkYXJrZW5lZEhzbFsyXSk7XG5cbiAgICAvLyByZXR1cm4gaXQgaW4gc3RyaW5nIGZvcm1cbiAgICByZXR1cm4gJ3JnYignICsgZGFya2VuZWRSZ2JbMF0gKyAnLCAnICsgZGFya2VuZWRSZ2JbMV0gKyAnLCAnICsgZGFya2VuZWRSZ2JbMl0gKyAnKSc7XG4gIH1cbn1cbiIsImZ1bmN0aW9uIGlzUmdiU3RyaW5nKHN1c3BlY3QpIHtcbiAgcmV0dXJuIHN1c3BlY3QubGFzdEluZGV4T2YoJ3JnYignLCAwKSA9PT0gMDtcbn1cblxuZXhwb3J0IHsgaXNSZ2JTdHJpbmcgfTtcbiIsImltcG9ydCB7IGlzUmdiU3RyaW5nIH0gZnJvbSAnLi4vQ2xhc3Nlcy9SZ2JTdHJpbmcnO1xuaW1wb3J0IENvbG9yICAgICAgICAgZnJvbSAnLi4vQ2xhc3Nlcy9Db2xvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXB1dGVkU3R5bGVTdHJhdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3NzUHJvcHNUb0NoYW5nZSA9IFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnYmFja2dyb3VuZENvbG9yJyxcbiAgICAgICdib3JkZXJDb2xvcicsXG4gICAgICAnYm9yZGVyVG9wQ29sb3InLFxuICAgICAgJ2JvcmRlclJpZ2h0Q29sb3InLFxuICAgICAgJ2JvcmRlckJvdHRvbUNvbG9yJyxcbiAgICAgICdib3JkZXJMZWZ0Q29sb3InLFxuICAgICAgJ291dGxpbmVDb2xvcidcbiAgICBdO1xuICB9XG5cbiAgYXBwbHlFZmZlY3QoKSB7XG4gICAgLy8gZ2V0IGFsbCB0aGUgZWxlbWVudHMsXG4gICAgLy8gbG9vcCB0aHJvdWdoIGluIHJldmVyc2Ugc2luY2Ugd2UgbmVlZCB0b1xuICAgIC8vIGFwcGx5IHRoZSBlZmZlY3Qgb24gdGhlIGxlYXZlcyBvbiB0aGUgRE9NIHRyZWUgZmlyc3QgdG9cbiAgICAvLyBjb3VudGVyYWN0IHRoZSBjYXNhZGluZyBlZmZlY3Qgb2YgY3NzLlxuICAgIHZhciBhbGxFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7IC8vZGlmZmVuY2Ugd2l0aCBxdWVyeVNlbGVjdG9yP1xuICAgIGZvciAodmFyIGkgPSBhbGxFbGVtZW50cy5sZW5ndGggLSAxOyBpID49IDAgOyBpLS0pIHtcbiAgICAgIGxldCBlbGVtZW50ICAgICAgPSBhbGxFbGVtZW50c1tpXTtcbiAgICAgIGxldCBjdXJyZW50U3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgICB0aGlzLmNzc1Byb3BzVG9DaGFuZ2UuZm9yRWFjaChmdW5jdGlvbihwcm9wLCBpKSB7XG4gICAgICAgIC8vIG9ubHkgY2hhbmdlIHRoZSBjb2xvciBvZiBpdCBpZiBoYXMgYSBjb2xvclxuICAgICAgICBpZiAoaXNSZ2JTdHJpbmcoY3VycmVudFN0eWxlW3Byb3BdKSkge1xuICAgICAgICAgIGxldCBjb2xvciA9IG5ldyBDb2xvcihjdXJyZW50U3R5bGVbcHJvcF0pO1xuICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBjb2xvci5pbnZlcnRMdW1hKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4iLCIvLyB2YXIgbGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpO1xuLy9cbi8vIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaW5rcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuLy8gICBpZiAobGlua3NbaV0uZ2V0QXR0cmlidXRlKCdyZWwnKSA9PSAnc3R5bGVzaGVldCcpIHtcbi8vICAgICBjb25zb2xlLmxvZyhsaW5rc1tpXSk7XG4vLyAgIH1cbi8vIH1cblwidXNlIHN0cmljdFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKSmJtcGxZM1JEYjI1MlpYSjBaV1JEYzNNdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5IiwiLyoqXG4gKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLiBDb252ZXJzaW9uIGZvcm11bGFcbiAqIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTTF9jb2xvcl9zcGFjZS5cbiAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZFxuICogcmV0dXJucyBoLCBzLCBhbmQgbCBpbiB0aGUgc2V0IFswLCAxXS5cbiAqXG4gKiBAcGFyYW0gICBOdW1iZXIgIHIgICAgICAgVGhlIHJlZCBjb2xvciB2YWx1ZVxuICogQHBhcmFtICAgTnVtYmVyICBnICAgICAgIFRoZSBncmVlbiBjb2xvciB2YWx1ZVxuICogQHBhcmFtICAgTnVtYmVyICBiICAgICAgIFRoZSBibHVlIGNvbG9yIHZhbHVlXG4gKiBAcmV0dXJuICBBcnJheSAgICAgICAgICAgVGhlIEhTTCByZXByZXNlbnRhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9Ic2wociwgZywgYil7XG4gIHIgLz0gMjU1LCBnIC89IDI1NSwgYiAvPSAyNTU7XG4gIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gIHZhciBoLCBzLCBsID0gKG1heCArIG1pbikgLyAyO1xuXG4gIGlmKG1heCA9PT0gbWluKXtcbiAgICBoID0gcyA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgfWVsc2V7XG4gICAgdmFyIGQgPSBtYXggLSBtaW47XG4gICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgIHN3aXRjaChtYXgpe1xuICAgICAgY2FzZSByOiBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7IGJyZWFrO1xuICAgICAgY2FzZSBnOiBoID0gKGIgLSByKSAvIGQgKyAyOyBicmVhaztcbiAgICAgIGNhc2UgYjogaCA9IChyIC0gZykgLyBkICsgNDsgYnJlYWs7XG4gICAgfVxuICAgIGggLz0gNjtcbiAgfVxuXG4gIHJldHVybiBbaCwgcywgbF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpe1xuICBpZih0IDwgMCkgdCArPSAxO1xuICBpZih0ID4gMSkgdCAtPSAxO1xuICBpZih0IDwgMS82KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcbiAgaWYodCA8IDEvMikgcmV0dXJuIHE7XG4gIGlmKHQgPCAyLzMpIHJldHVybiBwICsgKHEgLSBwKSAqICgyLzMgLSB0KSAqIDY7XG4gIHJldHVybiBwO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIEhTTCBjb2xvciB2YWx1ZSB0byBSR0IuIENvbnZlcnNpb24gZm9ybXVsYVxuICogYWRhcHRlZCBmcm9tIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSFNMX2NvbG9yX3NwYWNlLlxuICogQXNzdW1lcyBoLCBzLCBhbmQgbCBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDFdIGFuZFxuICogcmV0dXJucyByLCBnLCBhbmQgYiBpbiB0aGUgc2V0IFswLCAyNTVdLlxuICpcbiAqIEBwYXJhbSAgIE51bWJlciAgaCAgICAgICBUaGUgaHVlXG4gKiBAcGFyYW0gICBOdW1iZXIgIHMgICAgICAgVGhlIHNhdHVyYXRpb25cbiAqIEBwYXJhbSAgIE51bWJlciAgbCAgICAgICBUaGUgbGlnaHRuZXNzXG4gKiBAcmV0dXJuICBBcnJheSAgICAgICAgICAgVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gaHNsVG9SZ2IoaCwgcywgbCl7XG4gIHZhciByLCBnLCBiO1xuXG4gIGlmKHMgPT09IDApe1xuICAgIHIgPSBnID0gYiA9IGw7IC8vIGFjaHJvbWF0aWNcbiAgfWVsc2V7XG4gICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgIHZhciBwID0gMiAqIGwgLSBxO1xuICAgIHIgPSBodWUycmdiKHAsIHEsIGggKyAxLzMpO1xuICAgIGcgPSBodWUycmdiKHAsIHEsIGgpO1xuICAgIGIgPSBodWUycmdiKHAsIHEsIGggLSAxLzMpO1xuICB9XG5cbiAgcmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn1cblxuXG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU1YuIENvbnZlcnNpb24gZm9ybXVsYVxuICogYWRhcHRlZCBmcm9tIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSFNWX2NvbG9yX3NwYWNlLlxuICogQXNzdW1lcyByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV0gYW5kXG4gKiByZXR1cm5zIGgsIHMsIGFuZCB2IGluIHRoZSBzZXQgWzAsIDFdLlxuICpcbiAqIEBwYXJhbSAgIE51bWJlciAgciAgICAgICBUaGUgcmVkIGNvbG9yIHZhbHVlXG4gKiBAcGFyYW0gICBOdW1iZXIgIGcgICAgICAgVGhlIGdyZWVuIGNvbG9yIHZhbHVlXG4gKiBAcGFyYW0gICBOdW1iZXIgIGIgICAgICAgVGhlIGJsdWUgY29sb3IgdmFsdWVcbiAqIEByZXR1cm4gIEFycmF5ICAgICAgICAgICBUaGUgSFNWIHJlcHJlc2VudGF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hzdihyLCBnLCBiKXtcbiAgciA9IHIvMjU1LCBnID0gZy8yNTUsIGIgPSBiLzI1NTtcbiAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgdmFyIGgsIHMsIHYgPSBtYXg7XG5cbiAgdmFyIGQgPSBtYXggLSBtaW47XG4gIHMgPSBtYXggPT09IDAgPyAwIDogZCAvIG1heDtcblxuICBpZihtYXggPT09IG1pbil7XG4gICAgaCA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgfWVsc2V7XG4gICAgc3dpdGNoKG1heCl7XG4gICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XG4gICAgICBjYXNlIGc6IGggPSAoYiAtIHIpIC8gZCArIDI7IGJyZWFrO1xuICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcbiAgICB9XG4gICAgaCAvPSA2O1xuICB9XG5cbiAgcmV0dXJuIFtoLCBzLCB2XTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBIU1YgY29sb3IgdmFsdWUgdG8gUkdCLiBDb252ZXJzaW9uIGZvcm11bGFcbiAqIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTVl9jb2xvcl9zcGFjZS5cbiAqIEFzc3VtZXMgaCwgcywgYW5kIHYgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAxXSBhbmRcbiAqIHJldHVybnMgciwgZywgYW5kIGIgaW4gdGhlIHNldCBbMCwgMjU1XS5cbiAqXG4gKiBAcGFyYW0gICBOdW1iZXIgIGggICAgICAgVGhlIGh1ZVxuICogQHBhcmFtICAgTnVtYmVyICBzICAgICAgIFRoZSBzYXR1cmF0aW9uXG4gKiBAcGFyYW0gICBOdW1iZXIgIHYgICAgICAgVGhlIHZhbHVlXG4gKiBAcmV0dXJuICBBcnJheSAgICAgICAgICAgVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gaHN2VG9SZ2IoaCwgcywgdil7XG4gIHZhciByLCBnLCBiO1xuXG4gIHZhciBpID0gTWF0aC5mbG9vcihoICogNik7XG4gIHZhciBmID0gaCAqIDYgLSBpO1xuICB2YXIgcCA9IHYgKiAoMSAtIHMpO1xuICB2YXIgcSA9IHYgKiAoMSAtIGYgKiBzKTtcbiAgdmFyIHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XG5cbiAgc3dpdGNoKGkgJSA2KXtcbiAgICBjYXNlIDA6IHIgPSB2LCBnID0gdCwgYiA9IHA7IGJyZWFrO1xuICAgIGNhc2UgMTogciA9IHEsIGcgPSB2LCBiID0gcDsgYnJlYWs7XG4gICAgY2FzZSAyOiByID0gcCwgZyA9IHYsIGIgPSB0OyBicmVhaztcbiAgICBjYXNlIDM6IHIgPSBwLCBnID0gcSwgYiA9IHY7IGJyZWFrO1xuICAgIGNhc2UgNDogciA9IHQsIGcgPSBwLCBiID0gdjsgYnJlYWs7XG4gICAgY2FzZSA1OiByID0gdiwgZyA9IHAsIGIgPSBxOyBicmVhaztcbiAgfVxuXG4gIHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59XG5cbiIsImltcG9ydCBDb21wdXRlZFN0eWxlU3RyYXQgZnJvbSAnLi9TdHJhdGVnaWVzL0NvbXB1dGVkU3R5bGVTdHJhdCc7XG5cbmluaXQoKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgNzg6IC8vIG4ta2V5XG4gICAgICAgIHZhciBzdHJhdCA9IG5ldyBDb21wdXRlZFN0eWxlU3RyYXQoKTtcbiAgICAgICAgc3RyYXQuYXBwbHlFZmZlY3QoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==

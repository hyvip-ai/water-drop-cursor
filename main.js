(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const gooEffect = ` <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" class="gooSVG">
<defs>
    <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"></feGaussianBlur>
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
            result="goo"></feColorMatrix>
        <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
    </filter>
</defs>
</svg>`;

const cursorDiv = `<div id='cursor' class='Cursor'></div>`;

function addRequiredElements(){
  document.body.innerHTML = gooEffect + document.body.innerHTML;
document.body.innerHTML = cursorDiv + document.body.innerHTML;
}
 function init(sectionClassName = 'mouse-cursor', buttonId = 'button') {
  if(document){
    addRequiredElements();
    var _createClass = (function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var cursor = document.getElementById('cursor');
    var amount = 20;
    var sineDots = Math.floor(amount * 0.3);
    var width = 26;
    var idleTimeout = 150;
    var lastFrame = 0;
    var mousePosition = { x: 0, y: 0 };
    var dots = [];
    var timeoutID = void 0;
    var idle = false;
    var Dot = (function () {
      function Dot() {
        var index =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        _classCallCheck(this, Dot);
        this.index = index;
        this.anglespeed = 0.05;
        this.x = 0;
        this.y = 0;
        this.scale = 1 - 0.05 * index;
        this.range = width / 2 - (width / 2) * this.scale + 2;
        this.limit = width * 0.75 * this.scale;
        this.element = document.createElement('span');
        TweenMax.set(this.element, { scale: this.scale });
        cursor.appendChild(this.element);
      }
      _createClass(Dot, [
        {
          key: 'lock',
          value: function lock() {
            this.lockX = this.x;
            this.lockY = this.y;
            this.angleX = Math.PI * 2 * Math.random();
            this.angleY = Math.PI * 2 * Math.random();
          },
        },
        {
          key: 'draw',
          value: function draw(delta) {
            if (!idle || this.index <= sineDots) {
              TweenMax.set(this.element, { x: this.x, y: this.y });
            } else {
              this.angleX += this.anglespeed;
              this.angleY += this.anglespeed;
              this.y = this.lockY + Math.sin(this.angleY) * this.range;
              this.x = this.lockX + Math.sin(this.angleX) * this.range;
              TweenMax.set(this.element, { x: this.x, y: this.y });
            }
          },
        },
      ]);
      return Dot;
    })();
  
    function main() {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
      lastFrame += new Date();
      buildDots();
      render();
    }
  
    function startIdleTimer() {
      timeoutID = setTimeout(goInactive, idleTimeout);
      idle = false;
    }
  
    function resetIdleTimer() {
      clearTimeout(timeoutID);
      startIdleTimer();
    }
  
    function goInactive() {
      idle = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (
          var _iterator = dots[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          var dot = _step.value;
          dot.lock();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  
    function buildDots() {
      for (var i = 0; i < amount; i++) {
        var dot = new Dot(i);
        dots.push(dot);
      }
    }
  
    var onMouseMove = function onMouseMove(event) {
      mousePosition.x = event.clientX - width / 2;
      mousePosition.y = event.clientY - width / 2;
      resetIdleTimer();
    };
  
    var onTouchMove = function onTouchMove() {
      mousePosition.x = event.touches[0].clientX - width / 2;
      mousePosition.y = event.touches[0].clientY - width / 2;
      resetIdleTimer();
    };
  
    var render = function render(timestamp) {
      var delta = timestamp - lastFrame;
      positionCursor(delta);
      lastFrame = timestamp;
      requestAnimationFrame(render);
    };
  
    var positionCursor = function positionCursor(delta) {
      var x = mousePosition.x;
      var y = mousePosition.y;
      dots.forEach(function (dot, index, dots) {
        var nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw(delta);
        if (!idle || index <= sineDots) {
          var dx = (nextDot.x - dot.x) * 0.35;
          var dy = (nextDot.y - dot.y) * 0.35;
          x += dx;
          y += dy;
        }
      });
    };
  
    main();
  
    $(`.${sectionClassName}`).on('mouseenter', function (e) {
      $('#cursor').addClass('visible');
    });
    $(`.${sectionClassName}`).on('mouseleave', function (e) {
      $('#cursor').removeClass('visible');
    });
  }
}


module.exports = {
  init
}
},{}],2:[function(require,module,exports){
const { init } = require('water-drop-cursor');
init();

},{"water-drop-cursor":1}]},{},[2]);

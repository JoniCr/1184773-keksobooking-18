'use strict';
(function () {

  window.util = {

    getRandomElementFromArr: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getRandomNumbers: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomArray: function (array) {
      var lastElement = window.util.getRandomNumbers(1, array.length);
      return array.slice(0, lastElement);
    },

    debounce: function (cb) {
      var lastTimeout = null;
      var DEBOUNCE_INTERVAL = 500; // мс
      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },
    isEnterPressed: function (evt) {
      return evt.keyCode === window.data.ENTER_KEYCODE;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === window.data.ESC_KEYCODE;
    }
  };

})();

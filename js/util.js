'use strict';
(function () {

  window.util = {

    getRandomElmFromArr: function (arr) {
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
    }
  };

})();

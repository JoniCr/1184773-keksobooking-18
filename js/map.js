'use strict';

(function () {
  function inactiveMap() {
    window.data.map.classList.add('map--faded');
    window.data.adForm.classList.add('ad-form--disabled');
  }
  inactiveMap();
})();

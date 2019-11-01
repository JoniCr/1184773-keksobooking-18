'use strict';
(function () {
  var NUMBER_OF_ITEMS = 7;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var pinListElement = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var ENTER_KEYCODE = 13;
  var adForm = document.querySelector('.ad-form');
  var ESC_KEYCODE = 27;
  var popup = document.querySelector('.popup');
  var mapPinMain = document.querySelector('.map__pin--main');


  window.data = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    map: map,
    pinListElement: pinListElement,
    cardTemplate: cardTemplate,
    similarPinTemplate: similarPinTemplate,
    mapFiltersContainer: mapFiltersContainer,
    NUMBER_OF_ITEMS: NUMBER_OF_ITEMS,
    ENTER_KEYCODE: ENTER_KEYCODE,
    adForm: adForm,
    ESC_KEYCODE: ESC_KEYCODE,
    popup: popup,
    mapPinMain: mapPinMain
  };

})();

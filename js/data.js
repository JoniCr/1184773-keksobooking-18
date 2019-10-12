'use strict';
(function () {
  var NUMBER_OF_ITEMS = 7;
  var TYPE_OF_FLAT = ['palace', 'flat', 'house', 'bungalo'];
  var TYPE_OF_FLAT_RU = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var CHECKOUT_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var pinListElement = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var ENTER_KEYCODE = 13;
  var adForm = document.querySelector('.ad-form');


  window.data = {
    CHECKOUT_CHECKIN_TIMES: CHECKOUT_CHECKIN_TIMES,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    map: map,
    pinListElement: pinListElement,
    cardTemplate: cardTemplate,
    similarPinTemplate: similarPinTemplate,
    mapFiltersContainer: mapFiltersContainer,
    NUMBER_OF_ITEMS: NUMBER_OF_ITEMS,
    TYPE_OF_FLAT: TYPE_OF_FLAT,
    TYPE_OF_FLAT_RU: TYPE_OF_FLAT_RU,
    ENTER_KEYCODE: ENTER_KEYCODE,
    adForm: adForm
  };

  window.createRentsArr = function (number) {
    var rents = [];

    for (var i = 0; i <= number; i++) {
      rents.push({
        author: {
          avatar: 'img/avatars/user0' + [i + 1] + '.png'
        },
        offer: {
          title: 'чистая хата',
          address: '600, 350',
          price: 10000,
          type: window.util.getRandomElmFromArr(window.data.TYPE_OF_FLAT),
          rooms: 2,
          guests: 4,
          checkin: window.util.getRandomElmFromArr(window.data.CHECKOUT_CHECKIN_TIMES),
          checkout: window.util.getRandomElmFromArr(window.data.CHECKOUT_CHECKIN_TIMES),
          features: window.util.getRandomArray(window.data.FEATURES),
          description: 'Описание',
          photos: window.util.getRandomArray(window.data.PHOTOS)

        },
        location: {
          x: window.util.getRandomNumbers(1, 1200),
          y: window.util.getRandomNumbers(130, 630)
        }

      });
    }
    return rents;

  };

})();

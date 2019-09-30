'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var map = document.querySelector('.map');
map.classList.remove('map--faded');


var getRandomElmFromArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumbers = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


      author: {
        avatar: 'img/avatars/user0' + [i + 1] + '.png'
      },
      offer: {
        title: 'чистая хата',
        address: '600, 350',
        price: 10000,
        type: getRandomElmFromArr(TYPE_OF_FLAT),
        rooms: 2,
        guests: 4,
        checkin: getRandomElmFromArr(CHECKOUT_CHECKIN_TIMES),
        checkout: getRandomElmFromArr(CHECKOUT_CHECKIN_TIMES),

      },
      location: {
        x: getRandomNumbers(1, 1200),
        y: getRandomNumbers(130, 630)
      }

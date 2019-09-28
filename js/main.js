'use strict';

var TYPE_OF_FLAT = ['palace', 'flat', 'house', 'bungalo'];
var CHECKOUT_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomElmFromArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumbers = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createMockArr = function () {
  var mockArr = [];
  for (var i = 0; i <= 7; i++) {
    var mock = {
      author: {
        avatar: 'img/avatars/user0' + [i + 1] + '.png',
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
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: 'Описание',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: getRandomNumbers(1, 1200),
        y: getRandomNumbers(130, 630)
      }
    };
    mockArr.push(mock);
  }
  return mockArr;

};

var createPin = function (mockEl) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = mockEl.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = mockEl.location.y - PIN_HEIGHT / 2 + 'px';
  pinElement.querySelector('img').src = mockEl.author.avatar;
  pinElement.querySelector('img').salt = mockEl.offer.title;
  return pinElement;
};


var createFragmentPins = function () {
  var fragment = document.createDocumentFragment();
  var mockEls = createMockArr();
  for (var i = 0; i < mockEls.length; i++) {
    fragment.appendChild(createPin(mockEls[i]));
  }
  return fragment;
};

var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var pinBlock = document.querySelector('.map__pins');
pinBlock.appendChild(createFragmentPins());

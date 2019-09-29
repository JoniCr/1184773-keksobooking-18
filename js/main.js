'use strict';

var TYPE_OF_FLAT = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_OF_FLAT_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var CHECKOUT_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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

var getRandomPhoto = function () {
  var photos = [];
  var photosCount = getRandomNumbers(1, 3);
  for (var i = 0; i <= photosCount; i++) {
    photos.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return photos;
};

var createMockArr = function () {
  var mockArr = [];
  for (var i = 0; i <= 7; i++) {
    var mock = {
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
        features: getRandomElmFromArr(FEATURES),
        description: 'Описание',
        photos: getRandomPhoto()
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

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('map__card');

var createCard = function () {
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = createMockArr.author.title;
  card.querySelector('.popup__text--address').textContent = createMockArr.offer.address;
  card.querySelector('.popup__text--price').textContent = createMockArr.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = TYPE_OF_FLAT_RU[createMockArr.offer.type];
  card.querySelector('.popup__text--capacity').textContent = createMockArr.offer.rooms + ' комнаты для ' + createMockArr.offer.guests + 'гостей';
  card.querySelector('.popup__text--time').textContent = 'заезд после ' + createMockArr.offer.checkin + ', выезд до ' + createMockArr.offer.checkout;
  card.querySelector('.popup__features').textContent = createMockArr.offer.features;
  card.querySelector('.popup__description').textContent = createMockArr.offer.description;
  card.querySelector('.popup__photos').textContent = createMockArr.offer.description;

  return card;
};

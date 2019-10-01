'use strict';
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


var getRandomElmFromArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumbers = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (array) {
  var lastElement = getRandomNumbers(1, array.length);
  return array.slice(0, lastElement);
};

var createRentsArr = function (number) {
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
        type: getRandomElmFromArr(TYPE_OF_FLAT),
        rooms: 2,
        guests: 4,
        checkin: getRandomElmFromArr(CHECKOUT_CHECKIN_TIMES),
        checkout: getRandomElmFromArr(CHECKOUT_CHECKIN_TIMES),
        features: getRandomArray(FEATURES),
        description: 'Описание',
        photos: getRandomArray(PHOTOS)

      },
      location: {
        x: getRandomNumbers(1, 1200),
        y: getRandomNumbers(130, 630)
      }

    });
  }
  return rents;

};


var createPin = function (advertisment) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = advertisment.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = advertisment.location.y - PIN_HEIGHT / 2 + 'px';
  pinElement.querySelector('img').src = advertisment.author.avatar;
  pinElement.querySelector('img').salt = advertisment.offer.title;
  return pinElement;
};


var createFragmentPins = function (rents) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < rents.length; i++) {
    fragment.appendChild(createPin(rents[i]));
  }
  pinListElement.appendChild(fragment);
};

function createCards(advertisment) {
  var card = cardTemplate.cloneNode(true);
  var photoFragment = document.createDocumentFragment();
  var photoElement = card.querySelector('.popup__photo');
  var photoPart = card.querySelector('.popup__photos');
  var featurePart = card.querySelector('.popup__features');
  card.querySelector('.popup__title').textContent = advertisment.offer.title;
  card.querySelector('.popup__text--address').textContent = advertisment.offer.address;
  card.querySelector('.popup__text--price ').textContent = advertisment.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = TYPE_OF_FLAT_RU[advertisment.offer.type];
  card.querySelector('.popup__text--capacity').textContent = advertisment.offer.rooms + ' комнаты для ' + advertisment.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisment.offer.checkin + ', выезд до ' + advertisment.offer.checkout;
  card.querySelector('.popup__description').textContent = advertisment.offer.description;
  card.querySelector('.popup__avatar').src = advertisment.author.avatar;

  featurePart.innerHTML = '';
  for (var i = 0; i < advertisment.offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + advertisment.offer.features[i]);
    featurePart.append(feature);
  }

  photoPart.innerHTML = '';
  for (var j = 0; j < advertisment.offer.photos.length; j++) {
    var photo = photoElement.cloneNode(true);
    photo.src = advertisment.offer.photos[j];
    photoFragment.appendChild(photo);
  }
  photoPart.appendChild(photoFragment);

  return card;
}

var addCard = function (advItem) {
  var advertisment = createCards(advItem);
  map.insertBefore(advertisment, mapFiltersContainer);
};

var init = function () {
  var advArray = createRentsArr(NUMBER_OF_ITEMS);
  createFragmentPins(advArray);
  addCard(advArray[0]);
};

init();

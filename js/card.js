'use strict';

(function () {

  function createCards(advertisment) {
    var card = window.data.cardTemplate.cloneNode(true);
    var photoFragment = document.createDocumentFragment();
    var photoElement = card.querySelector('.popup__photo');
    var photoPart = card.querySelector('.popup__photos');
    var featurePart = card.querySelector('.popup__features');
    card.querySelector('.popup__title').textContent = advertisment.offer.title;
    card.querySelector('.popup__text--address').textContent = advertisment.offer.address;
    card.querySelector('.popup__text--price ').textContent = advertisment.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.data.TYPE_OF_FLAT_RU[advertisment.offer.type];
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

    var popupClose = card.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      card.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        card.remove();
      }
    });

    return card;
  }

  var removePopup = function () {

    if (window.data.popup) {
      window.data.popup.remove();
    }
  };


  window.card = {
    createCards: createCards,
    removePopup: removePopup
  };
})();

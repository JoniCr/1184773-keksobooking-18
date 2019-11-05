'use strict';

(function () {

  function createCards(advertisment) {
    var FlatTypes = {
      FLAT: 'Квартира',
      BUNGALO: 'Бунгало',
      HOUSE: 'Дом',
      PALACE: 'Дворец'
    };
    var card = window.data.cardTemplate.cloneNode(true);

    var popupClose = card.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      card.remove();
    });

    function drawInnerOfCard() {
      var photoFragment = document.createDocumentFragment();
      var photoElement = card.querySelector('.popup__photo');
      var photoPart = card.querySelector('.popup__photos');
      var featurePart = card.querySelector('.popup__features');
      card.querySelector('.popup__title').textContent = advertisment.offer.title;
      card.querySelector('.popup__text--address').textContent = advertisment.offer.address;
      card.querySelector('.popup__text--price ').textContent = advertisment.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = FlatTypes[advertisment.offer.type];
      card.querySelector('.popup__text--capacity').textContent = advertisment.offer.rooms + ' комнаты для ' + advertisment.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisment.offer.checkin + ', выезд до ' + advertisment.offer.checkout;
      card.querySelector('.popup__description').textContent = advertisment.offer.description;
      card.querySelector('.popup__avatar').src = advertisment.author.avatar;

      featurePart.innerHTML = '';
      advertisment.offer.features.forEach(function (item, index) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--' + advertisment.offer.features[index]);
        featurePart.append(feature);
      });


      photoPart.innerHTML = '';
      advertisment.offer.photos.forEach(function (item, index) {
        var photo = photoElement.cloneNode(true);
        photo.src = advertisment.offer.photos[index];
        photoFragment.appendChild(photo);
      });

      photoPart.appendChild(photoFragment);
    }

    drawInnerOfCard();

    document.addEventListener('keydown', function () {
      if (window.util.isEscPressed) {
        card.remove();
      }
    });

    return card;
  }
  window.card = {
    createCards: createCards
  };
})();

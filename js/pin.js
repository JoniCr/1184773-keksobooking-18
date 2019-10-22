'use strict';

(function () {

  var pinDeactivating = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var createPin = function (advertisment) {
    var pinElement = window.data.similarPinTemplate.cloneNode(true);


    pinElement.style.left = advertisment.location.x - window.data.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = advertisment.location.y - window.data.PIN_HEIGHT / 2 + 'px';
    pinElement.querySelector('img').src = advertisment.author.avatar;
    pinElement.querySelector('img').salt = advertisment.offer.title;

    pinElement.addEventListener('click', function (evt) {
      setAddCard(advertisment);
      setActivePin(evt);
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        setAddCard(1);
      }
    });

    return pinElement;
  };

  var setActivePin = function (evt) {
    pinDeactivating();
    evt.currentTarget.classList.add('map__pin--active');
  };

  var setAddCard = function (pin) {
    if (window.data.popup !== null) {
      window.data.popup.remove();
    }
    window.data.mapFiltersContainer.before(window.card.createCards(pin));
  };

  var createFragmentPins = function (rents) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < rents.length; i++) {
      fragment.appendChild(createPin(rents[i]));
    }
    window.data.pinListElement.appendChild(fragment);
  };

  var advArray = window.createRentsArr(window.data.NUMBER_OF_ITEMS);
  createFragmentPins(advArray);

})();

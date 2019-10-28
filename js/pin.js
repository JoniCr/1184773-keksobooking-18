'use strict';

(function () {
  var pinDeactivating = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var removePinElements = function () {
    var mapPinElements = document.querySelectorAll('.map__pin');

    for (var i = 1; i < mapPinElements.length; i++) {
      mapPinElements[i].remove();
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
        setAddCard(advertisment);
      }
    });

    var setActivePin = function (evt) {
      pinDeactivating();
      evt.currentTarget.classList.add('map__pin--active');
    };

    var setAddCard = function (pin) {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
      window.data.mapFiltersContainer.before(window.card.createCards(pin));
    };

    return pinElement;
  };

  var createFragmentPins = function (rents) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < rents.length; i++) {
      fragment.appendChild(createPin(rents[i]));
    }
    window.data.pinListElement.appendChild(fragment);
  };

  var mapPinMain = document.querySelector('.map__pin--main');

  var limits = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinSize = {
        width: 65,
        height: 65 + 22
      };

      var pinMoveLimit = {
        top: limits.y.min,
        bottom: limits.y.max,
        left: limits.x.min - mapPinMain.offsetWidth,
        right: limits.x.max - mapPinMain.offsetWidth
      };

      var pinPosition = {
        x: mapPinMain.offsetLeft - shift.x - pinSize.width / 2,
        y: mapPinMain.offsetTop - shift.y + pinSize.height / 2
      };

      if (pinPosition.x >= pinMoveLimit.left && pinPosition.x <= pinMoveLimit.right) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if (pinPosition.y >= pinMoveLimit.top && pinPosition.y <= pinMoveLimit.bottom) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
    }


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var addressInput = window.data.adForm.querySelector('#address');

      addressInput.value = mapPinMain.style.left + ' ' + mapPinMain.style.top;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function pageActivate() {
    var url = 'https://js.dump.academy/keksobooking/data';
    if (window.data.map.classList.contains('map--faded')) {
      window.load(url, function (data) {
        createFragmentPins(data);
      }, function () {
        window.message.showErrorMessage();
      });
    }

    window.data.map.classList.remove('map--faded');
  }

  window.data.mapPinMain.addEventListener('click', pageActivate);

  window.pin = {
    removePinElements: removePinElements
  };
})();

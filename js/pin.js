'use strict';

(function () {
  var PIN_QUANITY = 5;
  window.serverData = [];

  function pinDeactivating() {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  }

  function removePinElements() {
    var mapPinElements = document.querySelectorAll('.map__pin');

    for (var i = 1; i < mapPinElements.length; i++) {
      mapPinElements[i].remove();
    }
  }

  function createPin(advertisment) {

    var pinElement = window.data.similarPinTemplate.cloneNode(true);
    pinElement.style.left = advertisment.location.x - window.data.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = advertisment.location.y - window.data.PIN_HEIGHT / 2 + 'px';
    pinElement.querySelector('img').src = advertisment.author.avatar;
    pinElement.querySelector('img').salt = advertisment.offer.title;

    pinElement.addEventListener('click', function (evt) {
      setAddCard(advertisment);
      setActivePin(evt);
    });

    pinElement.addEventListener('keydown', function () {
      if (window.util.isEnterPressed) {
        setAddCard(advertisment);
      }
    });

    function setActivePin(evt) {
      pinDeactivating();
      evt.currentTarget.classList.add('map__pin--active');
    }

    function setAddCard(pin) {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
      window.data.mapFiltersContainer.before(window.card.createCards(pin));
    }

    return pinElement;
  }

  function createFragmentPins(rents) {

    var fragment = document.createDocumentFragment();
    rents = rents.slice(0, PIN_QUANITY);
    for (var i = 0; i < rents.length; i++) {
      fragment.appendChild(createPin(rents[i]));
    }
    removePinElements();
    window.data.pinListElement.appendChild(fragment);
  }

  function moveMainPin() {
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

    window.data.mapPinMain.addEventListener('mousedown', function (evt) {
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
          left: limits.x.min - window.data.mapPinMain.offsetWidth,
          right: limits.x.max - window.data.mapPinMain.offsetWidth
        };

        var pinPosition = {
          x: window.data.mapPinMain.offsetLeft - shift.x - pinSize.width / 2,
          y: window.data.mapPinMain.offsetTop - shift.y + pinSize.height / 2
        };

        if (pinPosition.x >= pinMoveLimit.left && pinPosition.x <= pinMoveLimit.right) {
          window.data.mapPinMain.style.left = (window.data.mapPinMain.offsetLeft - shift.x) + 'px';
        }

        if (pinPosition.y >= pinMoveLimit.top && pinPosition.y <= pinMoveLimit.bottom) {
          window.data.mapPinMain.style.top = (window.data.mapPinMain.offsetTop - shift.y) + 'px';
        }
      }


      function onMouseUp(upEvt) {
        upEvt.preventDefault();
        var addressInput = window.data.adForm.querySelector('#address');

        addressInput.value = window.data.mapPinMain.style.left + ' ' + window.data.mapPinMain.style.top;

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  moveMainPin();


  function pageActivate() {
    var url = 'https://js.dump.academy/keksobooking/data';
    if (window.data.map.classList.contains('map--faded')) {
      window.load(url, function (data) {
        window.serverData = data;
        createFragmentPins(window.serverData);
      }, function () {
        window.message.showErrorMessage();
      });
    }

    window.data.map.classList.remove('map--faded');
  }

  window.data.mapPinMain.addEventListener('click', pageActivate);

  window.pin = {
    removePinElements: removePinElements,
    createFragmentPins: createFragmentPins
  };
})();

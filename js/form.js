'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var documentInputs = document.querySelectorAll('fieldset');
  var addressInput = window.data.adForm.querySelector('#address');
  var selectRoom = window.data.adForm.querySelector('#room_number');
  var selectCapacity = window.data.adForm.querySelector('#capacity');
  var INVALID_BORDER_STYLE = '3px solid orange';

  function setDisabledInputs(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('disabled', 'disabled');
    }
  }

  function setActiveInputs(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute('disabled');
    }
  }

  function setInactivePinCoord() {
    addressInput.value = Math.round(mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2) + ', ' + Math.round(mapPinMain.offsetTop + window.data.PIN_HEIGHT / 2);
  }

  function setActivePinCoord() {
    addressInput.value = Math.round(mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2) + ', ' + Math.round(mapPinMain.offsetTop + window.data.PIN_HEIGHT);
  }

  function activeMap() {
    window.data.map.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');
    setActiveInputs(documentInputs);
    setActivePinCoord();
  }

  function inactiveMap() {
    window.data.map.classList.add('map--faded');
    window.data.adForm.classList.add('ad-form--disabled');
    setDisabledInputs(documentInputs);
    setInactivePinCoord();
  }

  inactiveMap();

  mapPinMain.addEventListener('mousedown', function () {
    activeMap();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activeMap();
    }
  });


  function checkRoomCapacity(room, capacity) {
    room = +room;
    capacity = +capacity;
    if (room === 1 && capacity !== 1) {
      return '1 комната только для 1 гостя';
    } else if (room === 2 && (capacity < 1 || capacity > 2)) {
      return '2 комнаты только для 1 гостя или 2 гостей';
    } else if (room === 3 && capacity === 0) {
      return '3 комнаты не могут использовать не для гостей';
    } else if (room === 100 && capacity !== 0) {
      return '100 комнат только не для гостей';
    }
    return '';
  }

  function setResultValidity(select, message) {
    selectRoom.style.border = '';
    selectRoom.setCustomValidity('');
    selectCapacity.style.border = '';
    selectCapacity.setCustomValidity('');
    select.style.border = message ? INVALID_BORDER_STYLE : '';
    select.setCustomValidity(message);
  }

  selectRoom.addEventListener('change', function (evt) {
    var messageValidity = checkRoomCapacity(evt.target.value, selectCapacity.value);
    setResultValidity(selectRoom, messageValidity);
  });

  selectCapacity.addEventListener('change', function (evt) {
    var messageValidity = checkRoomCapacity(selectRoom.value, evt.target.value);
    setResultValidity(selectCapacity, messageValidity);
  });
})();

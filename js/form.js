'use strict';

(function () {
  var documentInputs = document.querySelectorAll('fieldset');
  var addressInput = window.data.adForm.querySelector('#address');
  var selectRoom = window.data.adForm.querySelector('#room_number');
  var selectCapacity = window.data.adForm.querySelector('#capacity');
  var mapFilters = document.querySelectorAll('.map__filter');
  var minPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

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
    addressInput.value = Math.round(window.data.mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2) + ', ' + Math.round(window.data.mapPinMain.offsetTop + window.data.PIN_HEIGHT / 2);
  }

  function setActivePinCoord() {
    addressInput.value = Math.round(window.data.mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2) + ', ' + Math.round(window.data.mapPinMain.offsetTop + window.data.PIN_HEIGHT);
  }

  function activateMap() {
    window.data.adForm.classList.remove('ad-form--disabled');
    setActiveInputs(documentInputs);
    setActivePinCoord();
    setActiveInputs(mapFilters);
  }

  function inactivateMap() {
    window.data.adForm.classList.add('ad-form--disabled');
    setDisabledInputs(documentInputs);
    setInactivePinCoord();
    window.data.adForm.reset();
    window.data.mapPinMain.style.left = 570 + 'px';
    window.data.mapPinMain.style.top = 375 + 'px';
    setDisabledInputs(mapFilters);
  }
  inactivateMap();

  window.data.mapPinMain.addEventListener('mousedown', function () {
    activateMap();
  });

  window.data.mapPinMain.addEventListener('keydown', function () {
    if (window.util.isEnterPressed) {
      activateMap();
    }
  });

  function validateGuestNumber() {
    var roomToGuestMessage = '';

    if (selectRoom.value !== '100' && selectCapacity.value > selectRoom.value) {
      roomToGuestMessage = 'количество гостей не должно превышать ' + selectRoom.value + '.';
    } else if (selectRoom.value !== '100' && selectCapacity.value === '0') {
      roomToGuestMessage = 'данная опция доступна только для аппартаментов со 100 комнатами.';
    } else if (selectRoom.value === '100' && selectCapacity.value !== '0') {
      roomToGuestMessage = 'аппартаменты на 100 комнат не предназначены для гостей.';
    }

    selectCapacity.setCustomValidity(roomToGuestMessage);
  }

  validateGuestNumber();

  selectRoom.addEventListener('change', validateGuestNumber);
  selectCapacity.addEventListener('change', validateGuestNumber);

  function makeAnnouncementRequired() {
    titleInput.setAttribute('required', 'required');
    titleInput.setAttribute('minlength', '30');
    titleInput.setAttribute('maxlength', '100');
    // (type', 'number') всеровно не даст отправить с буквами и укажет на конкретную ошибку. Поэтому UX не становиться хуже.
    priceInput.setAttribute('required', 'required');
    priceInput.setAttribute('type', 'number');
    priceInput.setAttribute('max', '1000000');
  }


  function changeMinValue() {
    if (typeInput.value === 'bungalo') {
      priceInput.setAttribute('min', minPrices.bungalo);
      priceInput.setAttribute('placeholder', minPrices.bungalo);
    }
    if (typeInput.value === 'flat') {
      priceInput.setAttribute('min', minPrices.flat);
      priceInput.setAttribute('placeholder', minPrices.flat);
    }
    if (typeInput.value === 'house') {
      priceInput.setAttribute('min', minPrices.house);
      priceInput.setAttribute('placeholder', minPrices.house);
    }
    if (typeInput.value === 'palace') {
      priceInput.setAttribute('min', minPrices.palace);
      priceInput.setAttribute('placeholder', minPrices.palace);
    }
  }

  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });
  checkoutTime.addEventListener('change', function () {
    checkinTime.value = checkoutTime.value;
  });


  changeMinValue();
  typeInput.addEventListener('change', changeMinValue);

  makeAnnouncementRequired();

  if (window.data.map.classList.contains('map--faded')) {
    window.data.mapFiltersContainer.setAttribute('disabled', 'disabled');
  }

  window.data.adForm.addEventListener('submit', function (evt) {
    var url = 'https://js.dump.academy/keksobooking';
    window.upload(url, new FormData(window.data.adForm), function () {
      window.message.showSuccessMessage();
      window.pin.removePinElements();
      window.data.map.classList.add('map--faded');
      inactivateMap();
      if (window.data.popup) {
        window.data.popup.remove();
      }
    }, function () {
      window.message.showErrorMessage();
    });

    evt.preventDefault();
  });

})();

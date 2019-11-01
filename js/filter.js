'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var featuresElement = mapFilters.querySelector('#housing-features');
  var featuresList = Array.from(featuresElement.querySelectorAll('input[type=checkbox]'));
  var houseType = document.querySelector('#housing-type');
  var housPrice = document.querySelector('#housing-price');
  var houseRooms = document.querySelector('#housing-rooms');
  var housGuests = document.querySelector('#housing-guests');
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  function filterByPrice(it) {
    switch (housPrice.value) {
      case 'any':
        return true;
      case 'middle':
        return it.offer.price > LOW_PRICE && it.offer.price < HIGH_PRICE;
      case 'low':
        return it.offer.price <= LOW_PRICE;
      case 'high':
        return it.offer.price >= HIGH_PRICE;
      default:
        return false;
    }
  }

  function filterByRooms(it) {
    return houseRooms.value === 'any' ? true : it.offer.rooms.toString() === houseRooms.value;
  }

  function filterByType(it) {
    return houseType.value === 'any' ? true : it.offer.type === houseType.value;
  }

  function filterByGuests(it) {
    return housGuests.value === 'any' ? true : it.offer.guests.toString() === housGuests.value;
  }

  function filterByFeatures(it) {
    var checkedFeatures = featuresList.filter(function (element) {
      return element.checked;
    })
      .map(function (element) {
        return element.value;
      });

    var value = checkedFeatures.every(function (feature) {
      return it.offer.features.includes(feature);
    });
    return value;
  }

  function filterData(data) {
    return data.filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByRooms)
      .filter(filterByGuests)
      .filter(filterByFeatures);
  }

  var onFiltersFormChange = window.util.debounce(function () {
    window.pin.createFragmentPins(filterData(window.serverData));
  });

  mapFilters.addEventListener('change', onFiltersFormChange);
})();

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
  var housePrices = {
    any: 'any',
    middle: 'middle',
    low: 'low',
    high: 'high'
  };

  function filterByPrice(it) {
    switch (housPrice.value) {
      case housePrices.any:
        return true;
      case housePrices.middle:
        return it.offer.price > LOW_PRICE && it.offer.price < HIGH_PRICE;
      case housePrices.low:
        return it.offer.price <= LOW_PRICE;
      case housePrices.high:
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

  function filterByFeature(it) {

    var features = [];

    featuresList.forEach(function (element) {
      if (element.checked) {
        features.push(element.value);
      }
    });

    return features.every(function (el) {
      return it.offer.features.includes(el);
    });
  }

  function filterBy(data) {
    return filterByType(data) && filterByPrice(data) && filterByRooms(data) && filterByGuests(data) && filterByFeature(data);
  }

  function filterData(data) {
    return data.filter(filterBy);
  }

  var onFiltersFormChange = window.util.debounce(function () {
    window.pin.createFragmentPins(filterData(window.serverData));
  });

  mapFilters.addEventListener('change', onFiltersFormChange);
})();

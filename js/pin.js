'use strict';

(function () {
  var createPin = function (advertisment) {
    var pinElement = window.data.similarPinTemplate.cloneNode(true);

    pinElement.style.left = advertisment.location.x - window.data.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = advertisment.location.y - window.data.PIN_HEIGHT / 2 + 'px';
    pinElement.querySelector('img').src = advertisment.author.avatar;
    pinElement.querySelector('img').salt = advertisment.offer.title;
    return pinElement;
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

'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainBlock = document.querySelector('main');

  var showErrorMessage = function () {
    var errorElement = errorTemplate.cloneNode(true);

    mainBlock.appendChild(errorElement);

    var onErrorEscPress = function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        closeError();
      }
    };

    var closeError = function () {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    };

    document.addEventListener('keydown', onErrorEscPress);
    errorElement.addEventListener('click', closeError);
  };

  window.message = {
    showErrorMessage: showErrorMessage
  };

})();

'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainBlock = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  function showErrorMessage() {
    var errorElement = errorTemplate.cloneNode(true);

    mainBlock.appendChild(errorElement);

    var onErrorEscPress = function () {
      if (window.util.isEscPressed) {
        closeError();
      }
    };

    function closeError() {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    }

    document.addEventListener('keydown', onErrorEscPress);
    errorElement.addEventListener('click', closeError);
  }


  function showSuccessMessage() {
    var successElement = successTemplate.cloneNode(true);

    mainBlock.appendChild(successElement);

    function onSuccessEscPress() {
      if (window.util.isEscPressed) {
        closeSuccess();
      }
    }

    function closeSuccess() {
      successElement.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    }

    document.addEventListener('keydown', onSuccessEscPress);
    successElement.addEventListener('click', closeSuccess);
  }

  window.message = {
    showErrorMessage: showErrorMessage,
    showSuccessMessage: showSuccessMessage
  };

})();

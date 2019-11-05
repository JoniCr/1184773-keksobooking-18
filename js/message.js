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


  function onSuccessEscPress() {
    if (window.util.isEscPressed) {
      closeSuccess();
    }
  }
  // не понимаю почему не работает закрытие на esc, хотя в errorMessage работает
  function showSuccessMessage() {
    var successMessage = document.querySelector('.success');
    if (successMessage) {
      successMessage.classList.remove('hidden');
    } else {
      var successElement = successTemplate.cloneNode(true);
      document.addEventListener('keydown', onSuccessEscPress);
      mainBlock.appendChild(successElement);
    }
  }

  function closeSuccess() {
    document.querySelector('.success').classList.add('hidden');
  }

  window.message = {
    showErrorMessage: showErrorMessage,
    showSuccessMessage: showSuccessMessage
  };

})();

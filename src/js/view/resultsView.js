import listRecepiesView from './listRecepiesView';
import dropMenuView from './dropMenuView';

class ResultsView extends listRecepiesView {
  _parrentElement = document.querySelector('.results');

  _errorMessage = 'No recepies found for youre query! Please try again!';
  _message = '';

  constructor() {
    super();
    this.#getErrorMessage();
  }

  #getErrorMessage() {
    const self = this;

    for (const element of dropMenuView._dropmenu.querySelectorAll(
      'input[type=radio][name="filter"]'
    )) {
      element.addEventListener('change', e => {
        self._errorMessage =
          element.value == 2
            ? 'No hotels found for youre query! Please try again!'
            : 'No recepies found for youre query! Please try again!';
      });
    }
  }
}

export default new ResultsView();

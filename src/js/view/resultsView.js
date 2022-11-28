import listRecepiesView from './listRecepiesView';

class ResultsView extends listRecepiesView {
  _parrentElement = document.querySelector('.results');
  _errorMessage = 'No recepies found for youre query! Please try again!';
  _message = '';
}

export default new ResultsView();

import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parrentElement = document.querySelector('.results');
  _errorMessage = 'No recepies found for youre query! Please try again!';
  _message = '';

  _generateMarkup() {
    //console.log(this._data);
    // data koja sadrzi podatke rezultata pretrage  console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();

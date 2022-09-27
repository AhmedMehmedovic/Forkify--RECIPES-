import View from './view';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parrentElement = document.querySelector('.results');
  _errorMessage = 'No recepies found for youre query! Please try again!';
  _message = '';

  _generateMarkup() {
    // data koja sadrzi podatke rezultata pretrage  console.log(this._data);
    return this._data.map(this._generateMarkupPrewiew).join('');
  }

  _generateMarkupPrewiew(result) {
    return `
    <li class="preview">
            <a class="preview__link " href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
               
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultsView();

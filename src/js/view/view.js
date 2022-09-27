import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    console.log(data.results);
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear(); //// cisti html content prije rendanja ponovo

    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parrentElement.innerHTML = ''; ///prazni innerHtml
  }

  // funkcija za rendanje spinera dok ceka ucitavanje

  renderSpiner() {
    const markup = `
      <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
            `;

    this._clear();
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

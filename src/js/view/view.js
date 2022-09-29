//import { codePointAt } from 'core-js/core/string';
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  ////////////************************* */
  ////////////************************* */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear(); //// cisti html content prije rendanja ponovo

    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  ////////////************************* */
  _clear() {
    this._parrentElement.innerHTML = ''; ///prazni innerHtml
  }

  ////////////************************* */

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parrentElement.querySelectorAll('*')
    );

    //update changes text
    newElements.forEach((newEl, i) => {
      const curentEl = currentElements[i];
      //  console.log(curentEl, newEl.isEqualNode(curentEl));
      ///Updates mijenja text (broj servings i text kolicine )
      if (
        !newEl.isEqualNode(curentEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' ////firstchild ? sa ? provjeramo da li element ima first child jer nemaju svi elemeni child,  mijenjamo samo elemnt koji ima text
      ) {
        //  console.log(newEl, newEl.firstChild.nodeValue.trim());
        curentEl.textContent = newEl.textContent;
      }
      //// Updatuje atribute
      if (!newEl.isEqualNode(curentEl))
        Array.from(newEl.attributes).forEach(attr =>
          curentEl.setAttribute(attr.name, attr.value)
        );
      // /updates mijenja i atribut
      // if (!newEl.isEqualNode(curentEl)) console.log(newEl.attributes);
    });
  }

  ////////////************************* */

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

  ////////////************************* */

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

  ////////////************************* */

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

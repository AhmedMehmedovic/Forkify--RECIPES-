import View from './view';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parrentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    const publisher =
      this._data.type === 'recepie' ? this._data.publisher : this._data.email;

    const buttonBookmark =
      this._data.type === 'recepie'
        ? ` <button class="btn--inline btn--bookmark btn-delete-bookmark">
    <svg class="">
      <use href="${icons}#icon-bookmark${
            this._data.bookmarked ? '-fill' : ''
          }"></use>
    </svg>
  </button>`
        : '';

    const info =
      this._data.type === 'recepie'
        ? ''
        : `<div class="preview__data">
        <h4 class="preview__title">${this._data.phone}</h4>
        <p class="preview__publisher">${this._data.sourceUrl}
        </p>
        
      </div>`;
    return `
    <li class="preview" data-type="${this._data.type}">
            <a class="preview__link ${
              this._data.id === id ? 'preview__link--active' : ''
            }" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>

                <p class="preview__publisher">${publisher}</p>

                <p class="preview__publisher">${this._data.publisher}</p>

                
              </div>
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
              <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
        
      </div>

              ${buttonBookmark}
              ${info}

              <button class="btn--inline btn--bookmark btn-delete-bookmark">
              <svg class="">
                <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
              </svg>
            </button>

            </a>
          </li>
    `;
  }
}

export default new PreviewView();

import View from './view';

import icons from 'url:../../img/icons.svg';
import { Fractional } from '../../../node_modules/fractional';

class RecipeView extends View {
  _parrentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  /////////////************ ADDLISTENER ZA KLIK NA SERVING PROMJENU BROJA PORCIJA**************** */

  addHandlerUpdateServings(handler) {
    this._parrentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      // console.log(btn);
      if (!btn) return;
      const { updateTo } = btn.dataset; ///uz + pretvaramo u int

      //console.log(updateTo);

      if (+updateTo > 0) handler(+updateTo);
    });
  }
  /////////////************ **************** */

  /////////////************ ADDLISTENER ZA KLIK NA BOOKMARK**************** */
  addHandlerAddBookmark(handler) {
    this._parrentElement.addEventListener('click', function (e) {
      const btnBookmark = e.target.closest('.btn--bookmark');

      if (!btnBookmark) return;

      handler();
    });
  }

  ////////////**************************** */
  _generateMarkup() {
    // generisanje html recepata console.log(this.data);

    if (this._data.type == 'hotel') {
      const webDirections =
        this._data.sourceUrl !== ''
          ? ` <div class="recipe__directions">
      <h2 class="heading--2">Please check out
      directions to our website.</h2>
     
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Website</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`
          : ` <div class="recipe__directions">
      <h2 class="heading--2">We do not have website yet, please call us.</h2>
     
      
    </div>`;

      return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-email"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.email}</span>
            
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-location"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.address}</span>     
          </div>
         
         
        </div>       

       ${webDirections}

        <div class="recipe__directions">
        <h2 class="heading--3">Or you can call us on our phone:</h2>
       
       
          <span class="heading--2">${this._data.phone}</span>
         
        
      </div>
        `;
    }
    return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                ///slicno pagination btns oduzimamo ili dodajemo broj osoba za serviranje hrane
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__user-generated ${
            this._data.key ? '' : 'hidden'
          }"> 
          
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">

          ${this._data.ingredients
            .map(this._generateMarkupIngridients)
            .join('')}


            
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }
  _generateMarkupIngridients(ing) {
    return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
      `;
  }
}
export default new RecipeView();

import View from './view';

import icons from 'url:../../img/icons.svg';
import * as hotelRecipe from './addHotelToRecipe';
import addHotelView from './addHotelView';
import jQuery from 'jquery';
import { Fractional } from '../../../node_modules/fractional';

window.jQuery = window.$ = require('jquery');

import select2 from 'select2';
import 'select2/dist/css/select2.css';
import { MODAL_CLOSE_SEC } from '../config';
select2($);

class RecipeView extends View {
  _parrentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  _dataSelectedHotel;
  _dataRecepie;

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
    console.info(this._data);
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
        <div class="recipe_hotels">
        
        
          <h2 class="heading--2">HOTELS 
          
        </h2>
        <p>ADD THE HOTEL WHERE YOU ATE THIS MEAL  <button class="btn--tiny btn--update-servings add_hotel_toRecipe" >
        <svg>
          <use href="http://localhost:1234/icons.dfd7a6db.svg?1667811641178#icon-plus-circle"></use>
        </svg>
      </button></p>
          <ul class="recipe_hotels__ingredient-list">    

          </ul>
          
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

  render(data, render = true) {
    const _overlay = document.querySelector(
      'body > div.overlay-hotel-toRecipe.hidden'
    );
    const _addHoteltoRecipeWindow = document.querySelector(
      'body > div.add-hotel-toRecipe-window.hidden'
    );
    const _btnCloseModal = document.querySelector(
      'body > div.add-hotel-toRecipe-window.hidden > button'
    );

    // let x = $(() => {
    //   $('.js-example-basic-single').select2();
    // });
    //o console.log('f');
    super.render(data, render);

    this._parrentElement
      .querySelector('div.recipe_hotels > p > button')
      .addEventListener('click', e => {
        addHotelView.showWindow(_overlay, _addHoteltoRecipeWindow);
      });

    console.log(this._parrentElement);

    const hotels = JSON.parse(localStorage.getItem('hotels')) ?? [];
    const selectInput = $(_addHoteltoRecipeWindow).find('select');
    console.log(hotels);

    for (const hotel of hotels) {
      selectInput.append(`<option value="${hotel.id}">${hotel.title}</option>`);
    }

    selectInput.select2({
      placeholder: 'Izaberi hotel',
      allowClear: true,
      tags: false,
      multiple: true,
    });

    _btnCloseModal.addEventListener('click', e => {
      addHotelView.showWindow(_overlay, _addHoteltoRecipeWindow);

      $('[name="hoteli"]').val('');
    });
  }

  changeHandler(handler) {
    $('[name="hoteli"]').change(function () {
      this._dataSelectedHotel = $('[name="hoteli"]').val();
      handler(this._dataSelectedHotel);
    });
  }
}
export default new RecipeView();

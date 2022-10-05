import View from './view';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parrentElement = document.querySelector('div.upload');
  _message = 'Recipe was succesfully uploaded.';
  _dataArray;
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _form = document.querySelector('form.upload');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');

    setTimeout(() => {
      this._clear();
      this._form.classList.remove('hidden');
    }, 500);
  }

  //////////************otvaranje modala za dodavanje recepta */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));

    // this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  //////////************zatvaranje modala za dodavanje recepata*/

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  /////////////////*******dugme za upload */
  addHandlerUpload(handler) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      this.classList.add('hidden');
      //debugger;
      //if (!this) return;
      this._dataArray = [...new FormData(this)];
      const data = Object.fromEntries(this._dataArray); ///pretvaranje arraya u object

      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();

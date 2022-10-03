import View from './view';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parrentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  //////////************otvaranje modala za dodavanje recepta */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  //////////************zatvaranje modala za dodavanje recepata*/

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  /////////////////*******dugme za upload */
  addHandlerUpload(handler) {
    this._parrentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray); ///pretvaranje arraya u object
      console.log(dataArray);
      console.log(data);

      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();

import View from './view';

class AddHotel extends View {
  _parrentElement = document.querySelector;
  _btnAddHotel = document.querySelector('nav__btn--add-hotel');
  _overlay = document.querySelector('.overlay-hotel');
  _btnClose = document.querySelector('.btn--close-modalHotel');

  addHandlerAddhotel(handler) {
    this._btnAddHotel.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('dads');
      handler();
    });
  }

  toggleWindow(element1, element2) {
    element1.classList.toggle('hidden');
    element2.classList.toggle('hidden');
    // setTimeout(() => {
    //   this._clear();
    //   this._form.classList.remove('hidden');
    // }, 500);
  }

  //////////************otvaranje modala za dodavanje recepta */
  _addHandlerShowWindow() {
    this._btnAddHotel.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    // this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  //////////************zatvaranje modala za dodavanje recepata*/

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
}
export default new AddHotel();

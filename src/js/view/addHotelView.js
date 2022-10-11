import View from './view';

class AddHotel extends View {
  _parrentElement = document.querySelector;
  _btnAddHotel = document.querySelector('nav__btn--add-hotel');
  _overlay = document.querySelector('.overlay-hotel');
  _btnClose = document.querySelector('.btn--close-modalHotel');

  addHandlerAddhotel(handler) {
    this._parrentElement.addEventListener('click', function (e) {
      const btnBookmark = e.target.closest('.btn--bookmark');

      if (!btnBookmark) return;

      handler();
    });
  }
}

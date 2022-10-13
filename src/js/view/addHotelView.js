import View from './view';

class AddHotel extends View {
  _parrentElement = document.querySelector;
  _btnAddHotel = document.querySelector('.nav__btn--add-hotel');
  _overlay = document.querySelector('.overlay-hotel');
  _btnClose = document.querySelector('.close-motal-hotel');
  _addHotelWindow = document.querySelector('.add-hotel-window');

  clickElementHandler(element, handler) {
    element.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }

  showWindow(element1, element2) {
    element1.classList.toggle('hidden');
    element2.classList.toggle('hidden');
  }
}
export default new AddHotel();

import View from './view';

class DropMenu extends View {
  _parrentElement = document.querySelector('.btnDrop');
  _iconRecepies = document.querySelector('.icon_recipe');
  _iconHotel = document.querySelector('.icon_hotel');

  _dropmenu = document.querySelector('.dropMenu');
  _recepiesCheck = this._dropmenu.querySelector('[data-name="recepies"]');
  _hotelsCheck = this._dropmenu.querySelector('[data-name="hotels"]');
  _searchFild = document.querySelector('.search__field');

  stopSubmitDropBtn() {
    this._parrentElement.addEventListener('click', e => {
      e.preventDefault();

      e.stopPropagation();
    });
  }

  //Listener for change radio btns (hotel or recepies)
  onRadioChangeHandler(element, handler) {
    element.addEventListener('change', function (e) {
      e.preventDefault();
      handler();
    });
  }
  toggle(element) {
    element.classList.toggle('hidden');
  }
}
export default new DropMenu();

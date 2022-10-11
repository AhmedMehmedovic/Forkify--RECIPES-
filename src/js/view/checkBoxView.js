import View from './view';

class CheckBox extends View {
  _parrentElement = document.querySelector('.btn-check');
  _dropmenu = document.querySelector('.dropdown1');
  _recepiesCheck = this._dropmenu.querySelector('[data-name="recepies"]');
  _hotelsCheck = this._dropmenu.querySelector('[data-name="hotels"]');

  addHandlerFilter(handler) {
    this._parrentElement.addEventListener('click', function (e) {
      e.preventDefault();

      handler();
    });
  }
  addHandlerCheck() {
    if (this._recepiesCheck.checked == true) {
      this._hotelsCheck.checked = false;
    } else if (this._hotelsCheck.checked == true) {
      this._recepiesCheck.checked = false;
    }
  }
  toggle(element) {
    element.classList.toggle('hidden');
  }
}
export default new CheckBox();

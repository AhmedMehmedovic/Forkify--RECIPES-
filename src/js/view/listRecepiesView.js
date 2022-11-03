import View from './view';
import previewView from './previewView';

export default class listRecepiesView extends View {
  addHandlerDeleteBookmark(handler) {
    for (const element of this._parrentElement.querySelectorAll(
      'li.preview  .btn--bookmark'
    )) {
      element.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const parentA = e.target.closest('a');
        const id = parentA.getAttribute('href').slice(1);
        const index = this._data.findIndex(el => el.id === id);
        const recipe = this._data[index];
        if (index < 0) return;

        handler(recipe);
      });
    }
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parrentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    // data koja sadrzi podatke rezultata pretrage
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();

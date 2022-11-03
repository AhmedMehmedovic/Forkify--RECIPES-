import View from './view';
import previewView from './previewView';
import searchView from './searchView';
import recepieView from './recepieView';
import hotel from '../hotel';

class ListHotel {
  listHotel(handler) {
    console.log(previewView._data);

    handler();
  }
}
export default new ListHotel();

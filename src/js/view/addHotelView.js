import Rules from '../rulesValidator';
import Validator from '../validator';
import bookmarksView from './bookmarksView';
import AddRecipeView from './addRecipeView';

import recepieView from './recepieView';
import View from './view';
import { MODAL_CLOSE_SEC } from '../config';

class AddHotel extends View {
  _hotelsLocalStorage = [];
  _parrentElement = document.querySelector('.uploadHotel');
  _btnAddHotel = document.querySelector('.nav__btn--add-hotel');
  _overlay = document.querySelector('.overlay-hotel');
  _btnClose = document.querySelector('.close-motal-hotel');
  _addHotelWindow = document.querySelector('.add-hotel-window');
  _formHotel = document.querySelector('.upload-hotel');
  _formHotelchildForm = document.querySelector('.formHotel');

  _saveBtn = document.querySelector(
    'body > div.add-hotel-window > div > button.btn.upload__btn.save-hotel'
  );
  _btnReload = document.querySelector(
    'body > div.add-hotel-window > div > button.btn.button-reload'
  );
  _bodyElement = document.querySelector('body');

  _errors = [];
  clickElementHandler(element, handler) {
    element.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }

  showWindow(element1, element2) {
    this._parrentElement.remove();
    element1.classList.toggle('hidden');
    element2.classList.toggle('hidden');
  }

  randomIdHotel(data, id) {
    let dataLocal = JSON.parse(localStorage.getItem(data));
    dataLocal.forEach(element => {
      if (element.id == id) {
        element.id = Math.floor(Math.random() * 1000);
        this.randomIdHotel();
      } else {
        return dataLocal;
      }
    });
  }

  addHotelData(handler) {
    let self = this;
    this._saveBtn.addEventListener('click', function (e) {
      e.preventDefault();
      let randomId = JSON.parse(localStorage.getItem('hotels'));

      if (randomId == null) {
        randomId = 0;
      } else {
        randomId = JSON.parse(localStorage.getItem('hotels')).length;
      }
      self._dataArray = [...new FormData(self._formHotel)];
      //console.log(self._dataArray);
      // console.log([new FormData(self._formHotel)]);

      self._dataArray = self._dataArray.concat([['id', randomId]]);
      //console.log(self._dataArray);
      // self._dataArray.forEach(element => {
      //   console.log(element);
      // });
      const data = Object.fromEntries(self._dataArray);
      // data.id = randomId;
      //  console.log(data);
      const validator = new Validator(data);
      validator
        .setRules('title')
        .required()
        .minLength(3, 'Field Name of hotel is not correct!')
        .maxLength(15);
      validator.setRules('sourceUrl').urlCheck();
      validator.setRules('image').urlCheck();
      validator.setRules('address').maxLength(60);
      validator
        .setRules('Phone')
        .required()
        .minLength(9)
        .maxLength(20)
        .checkPhone();
      validator.setRules('Email').emailCheck();

      if (!validator.isValid()) {
        if (validator.errors.length > 0) {
          if (
            document.querySelector(
              'body > div.add-hotel-window > form > div.error'
            )
          ) {
            document
              .querySelector('body > div.add-hotel-window > form > div.error')
              .remove();
          }
          self._errors = validator.errors;
          self.renderError(self._errors, self._formHotel, 'beforeend');
        }
        self._errors = [];
        return false;
      }
      if (
        document.querySelector('body > div.add-hotel-window > form > div.error')
      ) {
        document
          .querySelector('body > div.add-hotel-window > form > div.error')
          .remove();
      }
      // self.#hotelsLocalStorage.push(data);
      // localStorage.setItem('hotels', JSON.stringify(self.#hotelsLocalStorage));
      // self.close;
      //console.error(self.#hotelsLocalStorage);
      // self.showWindow(self._addHotelWindow, self._overlay);
      //   View.renderError(this._errors, this._parrentElement);
      self._formHotel.reset();

      handler(data);
    });
  }
}
export default new AddHotel();

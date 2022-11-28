export default class add_Hotel_ToRecipe {
  _parentElement = document.querySelector('.recipe');
  _btnAddHotel = document.querySelector('.add_hotel_toRecipe');
  _overlay = document.querySelector('.overlay-hotel-toRecipe');
  _btnClose = document.querySelector('.close-modal-hotel-toRecipe');
  _addHoteltoRecipeWindow = document.querySelector(
    '.add-hotel-toRecipe-window'
  );
  _formHotel = document.querySelector('.upload-hotel-toRecipe');

  _saveBtn = document.querySelector(
    'body > div.add-hotel-toRecipe-window > div > button.btn.upload__btn.save-hotel-toRecipe'
  );
  _btnReload = document.querySelector(
    'body > div.add-hotel-window > div > button.btn.button-reload'
  );
  _bodyElement = document.querySelector('body');
}
import recepieView from './recepieView';

export const saveToLocal = function (data) {
  localStorage.setItem('connections', data);
};

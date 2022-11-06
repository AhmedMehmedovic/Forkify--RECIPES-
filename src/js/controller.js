import * as model from './model.js';
import { MODAL_CLOSE_SEC, RESULT_PER_PAGE } from './config.js';
import RecipeView from './view/recepieView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';
import addHotelView from './view/addHotelView.js';
import rulesValidator from './rulesValidator.js';
import DropMenu from './view/dropMenuView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recepieView from './view/recepieView.js';

import searchView from './view/searchView';
import View from './view/view.js';

//iz parcela dolazi ovo
// if (module.hot) {
//   module.hot.accept();
// }

////////////////////************************************************** */
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    const digital = /^\d+$/gm;
    //Loading recepi

    if (!id) return;
    RecipeView.renderSpiner();

    /// updejtovanje rezultata kako bi vidjeli koji je recept markiran tj selektovan

    resultsView.update(model.getSearchResultsPage()); /// isto kao sto dole koristimo render methodu na liniji 61 ovdje koristimo update kako ne bi ponovo rendali cijeli sadrzaj
    bookmarksView.update(model.state.bookmarks);

    if (id.match(digital)) {
      await model.loadHotel(id);
      RecipeView.render(model.state.recipe);
    } else {
      await model.loadRecipe(id);
      RecipeView.render(model.state.recipe);
    }
    //iz modela

    //console.log(data.publisher);
    //const { recipe } = model.state;

    // Rendering recepi
    //deklarisanje recepi view iz tog fajla

    //test  zbog async await funkcije
    // controlServings();
  } catch (err) {
    recepieView.renderError();
  }
};

///////////////////********************************************////////////////// */

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    const filterType = document.querySelector(
      'input[type=radio][name="filter"]:checked'
    ).value;

    if (!query) return;
    resultsView.renderSpiner();

    await model.loadSearchResults(query, filterType);

    // Rendanje  rezultata rezultata

    //   console.log(model.state.search.results);
    // rezultati prije paginacije za ucitavanje  resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    resultsView.addHandlerDeleteBookmark(controlToggleBookmark);

    // render initial pagination buttons

    paginationView.render(model.state.search);
  } catch (err) {
    //console.log(err);
  }
};

/////////////****************///////////////////*************** */ */

const controlPaginationaButtns = function (goToPage) {
  //Rendanje novih rezultata uz paginaciju

  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
  resultsView.addHandlerDeleteBookmark(controlToggleBookmark);

  // goto page broj stranice__>> console.log(goToPage);
};
//////////////*********************** */

const controlServings = function (newServings) {
  ///Update the recipe servings (in state)
  model.updateServings(newServings);

  /// update the recipe view
  // ponovo nam generise recept i njegove kolicine ( promjernom broja osoba mijenja se i potrebna kolicina sastojaka za izmradu jela) Da ne bi ponovo generisali uradit ce rendanje izmjenjenih vrijednosti u markupu
  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};
/////////////////////////////////////////////*///*******/////////// */

///////////****************** Oznacavanje bookmarked recepta fill i not fill*/
const controlAddBookmark = function () {
  ////zelimo samo kada recept nije vec spremljen u bookmarked
  //console.log(model.state.recipe.bookmarked);
  /////1 add or remove bookmark

  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  ////2 update recipeView

  ////3 render bookmarks
  bookmarksView.render(model.state.bookmarks);
  bookmarksView.addHandlerDeleteBookmark(controlToggleBookmark);

  //////OOOOO NASTAVITI OVDJE

  // console.log(model.getSearchResultsPage());
  //console.log(model.state.recipe.bookmarked);
  //model.state.recipe.bookmarked = true;

  resultsView.render(model.getSearchResultsPage());
  resultsView.addHandlerDeleteBookmark(controlToggleBookmark);
  recepieView.update(model.state.recipe);
};

const controlToggleBookmark = function (recipe) {
  if (!recipe.bookmarked) model.addBookmark(recipe, true);
  else model.deleteBookmark(recipe.id);

  bookmarksView.render(model.state.bookmarks);
  bookmarksView.addHandlerDeleteBookmark(controlToggleBookmark);

  //recipe.bookmarked = true;
  resultsView.render(model.getSearchResultsPage());
  resultsView.addHandlerDeleteBookmark(controlToggleBookmark);

  recepieView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
  bookmarksView.addHandlerDeleteBookmark(controlToggleBookmark);
};

///////////********kontroler za primanje novi podataka od unosa novog recepta */
/// iz model.js uploadRecipe je async funcija i vraca promise, da bi rendali gresku cekamo da se vrati promis zato dodajemo await u try bloku
const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spiner
    addRecipeView.renderSpiner();
    // upload the new recipe in data
    await model.uploadRecipe(newRecipe);
    //  console.log(model.state.recipe); //308 lekc
    //render recipe
    //recepieView.render(model.state.recipe);
    //succes message
    //console.log(addRecipeView.renderMessage);
    // render bookmark view
    bookmarksView.render(model.state.bookmarks);
    addRecipeView.renderMessage();
    //change ID in url

    window.history.pushState(null, '', `#${model.state.recipe.id}`); //mijenjamo url bez da refreshujemo browser
    // window.history.back() klikom u browseru za nazad automatski idemo nazad

    /// close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
      //location.reload();
    }, MODAL_CLOSE_SEC * 1000); ///*1000 pretvara broj nasih sekundi u milisekunde
  } catch (err) {
    //console.log('14141' + err);
    addRecipeView.renderError(err.message);
  }
  // console.log(newRecipe);
  ///Upload novi recipe data
};
const showCloseDropmenu = function () {
  DropMenu.toggle(DropMenu._dropmenu);

  //console.log(checkBoxView._recepiesCheck);
};

const controlRadioBtns = function () {
  DropMenu.toggle(DropMenu._iconHotel);
  DropMenu.toggle(DropMenu._iconRecepies);

  if (DropMenu._iconHotel.classList.contains('hidden')) {
    DropMenu._searchFild.placeholder = 'Search recepies!!';
    showCloseDropmenu();
  }
  if (DropMenu._iconRecepies.classList.contains('hidden')) {
    DropMenu._searchFild.placeholder = 'Search hotels!!';
    showCloseDropmenu();
  }
};

/// control add hotel handler
/////klik dodaj hotel modal
const addModalHotel = function () {
  addHotelView.showWindow(addHotelView._addHotelWindow, addHotelView._overlay);

  _errorView = document.querySelector(
    'body > div.add-hotel-window > form > div.error'
  );
  if (_errorView) {
    _errorView.remove();
  }
  if (addHotelView._formHotelchildForm.classList.contains('hidden')) {
    addHotelView._formHotelchildForm.classList.remove('hidden');
    addHotelView._saveBtn.classList.remove('hidden');
  }
};
////zatvori hotel modal
const closeWindowHotel = function () {
  addHotelView.showWindow(addHotelView._addHotelWindow, addHotelView._overlay);
};
////***Upravljanje datom iz unosa modal hotel* */
const controlHotelData = function (data) {
  if (
    addHotelView._hotelsLocalStorage.length <= 0 &&
    localStorage.getItem('hotels') !== null
  ) {
    addHotelView._hotelsLocalStorage = JSON.parse(
      localStorage.getItem('hotels')
    );
    let newAlldata = addHotelView._hotelsLocalStorage.concat(data);
    model.storingLocalStorage('hotels', newAlldata);
  }
  addHotelView._hotelsLocalStorage.push(data);

  model.storingLocalStorage('hotels', addHotelView._hotelsLocalStorage);

  closeWindowHotel();
};

///*** */
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);

  recepieView.addHandlerRender(controlRecipes);

  recepieView.addHandlerUpdateServings(controlServings);
  recepieView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPaginationaButtns);
  addRecipeView.addHandlerUpload(controlAddRecipe);

  DropMenu.onRadioChangeHandler(DropMenu._recepiesCheck, controlRadioBtns);
  DropMenu.onRadioChangeHandler(DropMenu._hotelsCheck, controlRadioBtns);

  DropMenu.stopSubmitDropBtn();
  //// ucitavamo ali jos uvijek nije stigao odgovor ucitavanja recepata async await
  addHotelView.clickElementHandler(addHotelView._btnAddHotel, addModalHotel);
  addHotelView.clickElementHandler(addHotelView._btnClose, closeWindowHotel);
  addHotelView.addHotelData(controlHotelData);

  // controlServings();
};
init();

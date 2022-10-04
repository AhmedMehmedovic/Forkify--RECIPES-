import * as model from './model.js';
import { MODAL_CLOSE_SEC, RESULT_PER_PAGE } from './config.js';
import RecipeView from './view/recepieView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recepieView from './view/recepieView.js';
import { async } from 'regenerator-runtime';
import searchView from './view/searchView';

//iz parcela dolazi ovo
// if (module.hot) {
//   module.hot.accept();
// }

////////////////////************************************************** */
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    //Loading recepi
    if (!id) return;
    RecipeView.renderSpiner();

    /// updejtovanje rezultata kako bi vidjeli koji je recept markiran tj selektovan

    resultsView.update(model.getSearchResultsPage()); /// isto kao sto dole koristimo render methodu na liniji 61 ovdje koristimo update kako ne bi ponovo rendali cijeli sadrzaj
    bookmarksView.update(model.state.bookmarks);

    //iz modela
    await model.loadRecipe(id);

    const { recipe } = model.state;

    // Rendering recepi
    //deklarisanje recepi view iz tog fajla
    RecipeView.render(model.state.recipe);

    //test  zbog async await funkcije
    // controlServings();
  } catch (err) {
    recepieView.renderError();
    //  console.log(err);
  }
};

///////////////////********************************************////////////////// */

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    // if (!query) return;
    resultsView.renderSpiner();

    await model.loadSearchResults(query);

    // Rendanje  rezultata rezultata

    //   console.log(model.state.search.results);
    // rezultati prije paginacije za ucitavanje  resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // render initial pagination buttons

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

/////////////****************///////////////////*************** */ */

const controlPaginationaButtns = function (goToPage) {
  //Rendanje novih rezultata uz paginaciju

  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);

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
  recepieView.update(model.state.recipe);

  ////3 render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

////////////**************** */
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

///////////********kontroler za primanje novi podataka od unosa novog recepta */
/// iz model.js uploadRecipe je async funcija i vraca promise, da bi rendali gresku cekamo da se vrati promis zato dodajemo await u try bloku
const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spiner
    addRecipeView.renderSpiner();

    // upload the new recipe in data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe); //308 lekc

    //render recipe

    recepieView.render(model.state.recipe);

    //succes message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change ID in url

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back()

    /// close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000); ///*1000 pretvara broj nasih sekundi u milisekunde
  } catch (err) {
    console.log('14141' + err);
    addRecipeView.renderError(err.message);
  }
  // console.log(newRecipe);
  ///Upload novi recipe data
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  recepieView.addHandlerRender(controlRecipes);
  recepieView.addHandlerUpdateServings(controlServings);
  recepieView.addHandlerAddBookmark(controlAddBookmark);

  paginationView.addHandlerClick(controlPaginationaButtns);
  addRecipeView.addHandlerUpload(controlAddRecipe);

  //// ucitavamo ali jos uvijek nije stigao odgovor ucitavanja recepata async await
  // controlServings();
};
init();

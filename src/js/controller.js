import * as model from './model.js';
import RecipeView from './view/recepieView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

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
  }
};

///////////////////********************************************////////////////// */

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();

    const query = searchView.getQuery();

    if (!query) return;

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
const init = function () {
  recepieView.addHandlerRender(controlRecipes);
  recepieView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPaginationaButtns);
  //// ucitavamo ali jos uvijek nije stigao odgovor ucitavanja recepata async await
  // controlServings();
};
init();

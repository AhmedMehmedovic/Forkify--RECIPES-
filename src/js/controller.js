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

    //iz modela
    await model.loadRecipe(id);

    const { recipe } = model.state;

    // Rendering recepi
    //deklarisanje recepi view iz tog fajla
    RecipeView.render(model.state.recipe);
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

/////////////////////////////////////////////*///*******/////////// */
const init = function () {
  recepieView.addHandlerRender(controlRecipes);

  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPaginationaButtns);
};
init();

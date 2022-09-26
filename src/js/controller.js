import * as model from './model.js';
import RecipeView from './view/recepieView.js';
import resultsView from './view/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recepieView from './view/recepieView.js';
import { async } from 'regenerator-runtime';
import searchView from './view/searchView';

//iz parcela dolazi ovo
// if (module.hot) {
//   module.hot.accept();
// }

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

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);
    //   console.log(model.state.search.results);
    // rezultati prije paginacije za ucitavanje  resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  recepieView.addHandlerRender(controlRecipes);

  searchView.addHandlerSearch(controlSearchResults);
};
init();

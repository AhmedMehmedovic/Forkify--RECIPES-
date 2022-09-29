import { async } from 'regenerator-runtime';
import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients, ///informacija o sastojcima
    };

    ///zapamti fill bookmark prilikom ponovnog rendanja
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(state.recipe);
  } catch (err) {
    //temporary error handling
    console.log(`${err} ******`);

    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1; ///restartujemo broj stranice koja se prikazuje prilikom svake pretrage (bug) postavljamo stranicu ponovo na 1
  } catch (err) {
    console.log(`${err}`);
  }
};

//paginacija
export const getSearchResultsPage = function (page = state.search.page) {
  // ako npr imamo 1 stranicu : 1-1 = 0 puta 10 je 0 npr: 2- 1 = 1 puta 10 = 10 a krajnja tacka izadje 20 ( znaci na drugoj stranici prikazati od 10 do 20 rezultat)

  state.search.page = page; // updatovat ce se posle preracuna paginacije (goto parametra)
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};
//loadSearchResults('pizza');

/// updejtovanje kolicina za koliko osoba
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingridient => {
    ingridient.quantity =
      (ingridient.quantity * newServings) / state.recipe.servings;

    /// formula za racunanje kolicina koliko treba za izradu recepta
    // newQuantity = oldQuantity * newServings / oldServings   ////  2*8 / 4 = 4
  });

  state.recipe.servings = newServings;
};

//// spremanje cekiranih recepata (bookmark) u localstorage
const storingBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
  // dodavanje recepata u array bookmark
  state.bookmarks.push(recipe);

  ////oznacavanje trenutnog recepta u bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true; // ako je id recepta proslijedjenog jednak onom u aplikaciji trenutnom  onda  postavljamo state.recipe.bookmarked true
  storingBookmarks();
};

/////********************DELETE BOOKMARK */
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  ////brisanje trenutnog recepta iz bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  storingBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
// console.log(state.bookmarks);
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
//clearBookmarks();

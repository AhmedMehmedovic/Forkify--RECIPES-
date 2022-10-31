import { API_URL, RESULT_PER_PAGE, KEY } from './config';
//import { getJSON, sendJSON } from './helpers'; /// zamijenjeno sa jednom funkcijom AJAX
import { AJAX } from './helpers';

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

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients, ///informacija o sastojcima
    ...(recipe.key && { key: recipe.key }), /// ukoliko ne postoji recipe.key, nece se desiti nista, medjutim ukoliko postoji onda ce se spremiti kao da je napisano 'key: recipe.key ' (zaduzen spread operatotr ...)
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);
    ///zapamti fill bookmark prilikom ponovnog rendanja
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(state.recipe);
  } catch (err) {
    //temporary error handling
    // console.error(`${err} ******`);

    throw err;
  }
};

export const loadSearchResults = async function (query, filterType = 1) {
  try {
    //console.log(query);
    state.search.query = query;
    if (filterType == 1) {
      const data = await AJAX(`?search=${query}&key=${KEY}`); //// ?key=${KEY} dodajemo vlastiti kljuc u api
      //  console.log(data);
      state.search.results = data.data.recipes.map(rec => {
        if (state.bookmarks.some(bookmark => bookmark.id === rec.id))
          rec.bookmarked = true;
        else rec.bookmarked = false;

        return {
          type: 'recepie',
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
          bookmarked: rec.bookmarked,
          ...(rec.key && { key: rec.key }),
        };
      });
    } else {
      const data = JSON.parse(localStorage.getItem('hotels'));

      const dataHotel = data.filter(element =>
        element.title.toLowerCase().includes(query.toLowerCase())
      );

      const hotel = dataHotel[1];
      //console.log(data); //// ?key=${KEY} dodajemo vlastiti kljuc u api

      state.search.results = dataHotel.map(
        hotel => ({
          type: 'hotel',
          id: hotel.id,
          title: hotel.title,
          publisher: '',
          image: hotel.image,
          bookmarked: false,
          email: hotel.Email,
          phone: hotel.Phone,
          sourceUrl: hotel.sourceUrl,
        })

        //    {
        //   if (state.bookmarks.some(bookmark => bookmark.title === hotel.title))
        //     hotel.bookmarked = true;
        //   else hotel.bookmarked = false;
        // });
      );
      // console.log(state.search.results);
      // state.search.results = [
      //   {
      //     type: 'hotel',
      //     id: hotel.id,
      //     title: hotel.title,
      //     publisher: '',
      //     image: hotel.image,
      //     bookmarked: false,
      //     email: hotel.Email,
      //     phone: hotel.Phone,
      //     sourceUrl: hotel.sourceUrl,
      //   },
      // ];
    }

    state.search.page = 1; ///restartujemo broj stranice koja se prikazuje prilikom svake pretrage (bug) postavljamo stranicu ponovo na 1
  } catch (err) {
    // console.error(`${err}`);
  }
};
///////////*********/// */

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
export const storingLocalStorage = function (
  keyName = 'bookmarks',
  data = state.bookmarks
) {
  localStorage.setItem(keyName, JSON.stringify(data));
};

///**********///// */
export const addBookmark = function (recipe, bookmark = true) {
  // dodavanje recepata u array bookmark
  if (bookmark) {
    recipe.bookmarked = true;
  }

  const indexBookmark = state.bookmarks.findIndex(el => el.id === recipe.id);
  if (indexBookmark > -1) {
    state.bookmarks[indexBookmark].bookmarked = recipe.bookmarked;
  } else {
    state.bookmarks.push(recipe);
  }

  /// ispravka za reakciju na dugme bookmark na recept updatuje i na listi search i na bookmark listi

  const indexResults = state.search.results.findIndex(
    el => el.id === recipe.id
  );
  if (indexResults > -1) {
    state.search.results[indexResults].bookmarked = recipe.bookmarked;
  }

  ////oznacavanje trenutnog recepta u bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true; // ako je id recepta proslijedjenog jednak onom u aplikaciji trenutnom  onda  postavljamo state.recipe.bookmarked true
  storingLocalStorage();
};

/////*********DELETE BOOKMARK */
export const deleteBookmark = function (id) {
  const indexBookmark = state.bookmarks.findIndex(el => el.id === id);
  const indexResults = state.search.results.findIndex(el => el.id === id);
  if (indexResults > -1) {
    state.search.results[indexResults].bookmarked = false;
  }
  state.bookmarks.splice(indexBookmark, 1);
  ////brisanje trenutnog recepta iz bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  storingLocalStorage();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
// console.log(state.bookmarks);
// const clearBookmarks = function () {
//   localStorage.clear('bookmarks');
// };
//clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArray = ing[1].split(',').map(element => element.trim());
        // const ingArray = ing[1].replaceAll(' ', '').split(',');

        if (ingArray.length !== 3)
          throw new Error(
            'Wrong ingridient format. Please use the correct format.'
          );

        const [quantity, unit, description] = ingArray;

        return { quantity: quantity ? +quantity : null, unit, description }; //ako ima quantity onda konvertujemo sa + u number
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    //console.log(recipe);

    const data = await AJAX(`?key=${KEY}`, recipe); //// saljemo data( post request) dadajemo novi unos svog recepta i saljemo ka api url uz svoj key generisan na forkify
    state.recipe = createRecipeObject(data);
    // console.log(state.recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

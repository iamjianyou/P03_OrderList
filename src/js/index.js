import List from './models/List'
import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements, clearLoader, renderLoader} from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'

/** Global state of the app 
 * -Search object
 * -Shopping list object
 * -Like recipes
*/

const state = {}; // global state

// search Controller
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();
    
            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// import axios from 'axios';


// async function getResults(query){
//     const key = '4b03cd0c7ed2a6ee58ee3c88ab01c23c'
//     try{
//         const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
//         const recipes = res.data.recipes
//         console.log(recipes);

//     } catch(error) {

//         alert(error)
//     }
// }

// getResults('tomato');




/** 
 * RECIPE CONTROLLER
 */
//  const r = new Recipe(46956);
//  r.getRecipe();-
//  console.log(r)
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        // searchView.highlightSelected(id);
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe
            );
            


        }catch(err){
            console.log(err);
            alert('Error processing recipe!');
        }
        
    }
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/** Handling recipe button clicks */

// attach event listener to elements recipe
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');

            recipeView.updateServingsIngredients(state.recipe);
        }
        
    }else if (e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }

    // console.log(state.recipe);
});

// Testing list add/delete/update items
// window.l = new List();

import List from './models/List'
import Search from './models/Search';
import Recipe from './models/Recipe';
import Likes from './models/Likes';
import {elements, clearLoader, renderLoader} from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'




/** Global state of the app 
 * -Search object
 * -Shopping list object
 * -Like recipes
*/

const state = {}; // global state

/** for testing purpose */
window.state = state;



/** ********************************************************************************************
 *  SEARCH CONTROLLER
 * ********************************************************************************************/
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




/** ********************************************************************************************
 * RECIPE CONTROLLER
 * **********************************************************************************************/
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
                state.recipe, 
                state.likes.isLiked(id)
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

/** ********************************************************************************************
 * LIST CONTROLLER
 * ********************************************************************************************/
const controlList = () => {
    // create a new list IF there is in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI 
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
}

/** Handle delete and update list item events */
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    // handle the delete btn event
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        // delete from state
        state.list.deleteItem(id);

        // delete(update) del from UI
        listView.deleteItem(id);

    // handel count update
    } else if (e.target.matches('.shopping__count-value')){

        // store the current value which is clicked
        // update count  id and value
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }

    
});


/** ********************************************************************************************
 * LIKES CONTROLLER
 * ********************************************************************************************/
// think: where to trigger likes of cousre on the button

state.likes = new Likes(); // for testing, remove later on

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // user not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        console.log(state.likes);

    } else {
        // Remove like from the state
        state.likes.removeLike(currentID);


        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // remove from like from UI list
        console.log(state.likes);
    }
}


/** ********************************************************************************************
 * HANDLING RECIPE REVENT LISTENERS - RECIPE BUTTON CLICKS
 * ********************************************************************************************/
// attach event listener to elements recipe
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');

            recipeView.updateServingsIngredients(state.recipe);
        }
        
    } else if (e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add * ')){
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        // like controller
        controlLike();
    }

    // console.log(state.recipe);
});

// Testing list add/delete/update items
// window.l = new List();

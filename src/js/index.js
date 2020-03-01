
import Search from './models/Search'
import Recipe from './models/Recipe'
import {elements, clearLoader} from './views/base'
import * as searchView from './views/searchView'

/** Global state of the app 
 * -Search object
 * -Shopping list object
 * -Like recipes
*/

const state = {}; // global state

// search Controller
const controlSearch = async () => {
    // 1> get query from view
    const query = searchView.getInput();
    
    if(query){
    // 2> New serach object and add to state
        state.search = new Search(query)

    // 3> Prepare UI for result
        searchView.clearInput();
        searchView.clearResults();
        try{
        // 4> Search for recipes
        await state.search.getResults();


        // 5> Render results on UI
        searchView.renderResults(state.search.result);

        }catch(err){
            alert('shit happens with the search...')
            clearLoader();
        }
    }
}


elements.searchForm.addEventListener('submit', e=>{
    // avoid empty reload
    e.preventDefault();

    controlSearch();

})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); // .closet allows the click to find the closet element
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.renderResults(state.search.result, goToPage, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage)
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
 * Recipe Controller
 * 
 */



//  const r = new Recipe(46956);
//  r.getRecipe();-
//  console.log(r)
const controlRecipe  = async () => {
    const id = window.location.hash.replace('#', '');
    console.log('get the id with no # -===>>> ', id);

    if(id){
        // prepare UI for changes


        // Create new recipe object
        try{
            
            state.recipe =  new Recipe(id);        

            // Get recipe data
            await state.recipe.getRecipe();

            //  Caculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // rendering the recipe
            console.log(state.recipe);

        }catch(err){
            alert('Error processing recipe!')
        }
        
    }
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashChange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
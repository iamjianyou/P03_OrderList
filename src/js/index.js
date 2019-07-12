
import Search from './models/Search'

/** Global state of the app 
 * -Search object
 * -Shopping list object
 * -Like recipes
*/

const state = {}; // global state

// search Controller
const controlSearch = async() =>{
    // 1> get query from view
    const query = 'pizza' //TODO
    if(query){
    // 2> New serach object and add to state
        state.search = new Search(query)

    // 3> Prepare UI for result


    // 4> Search for recipes
        await state.search.getResults();


    // 5> Render results on UI
        console.log(state.search.result);
    }
}


document.querySelector('.search').addEventListener('submit', e=>{
    // avoid empty reload
    e.preventDefault();

    controlSearch();

})

const search = new Search('pizza');
console.log(search);
search.getResults();

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





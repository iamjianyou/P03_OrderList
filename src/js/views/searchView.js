import {elements} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {elements.searchInput.value = '';};
export const clearResults = () => {elements.searchResList.innerHTML = ''};




// 'pasta with tomato and spinach'
/**
 * accumalator: 0 / acc + cur.length = 5 / newTitle= ['Pasta']
 * accumalator: 5 / acc + cur.length = 4 / newTitle= ['Pasta', 'with']
 * accumalator: 9 / acc + cur.length = 15 / newTitle= ['Pasta', 'with', 'tomato']
 * accumalator: 15 / acc + cur.length = 18 / newTitle= ['Pasta', 'with', 'tomato']
 * accumalator: 18 / acc + cur.length = 24 / newTitle= ['Pasta', 'with', 'tomato']
 * 
 * 
 * 
 * @param {*} title 
 * @param {*} limit 
 */
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc, curr)=>{
            if(acc + curr.length <= limit){
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;

    }

    return title;
}




const renderRecipe = recipe => {

    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title, 20)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>

    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
    
};

export const renderResults = recipes => {
    console.log('recipes', recipes)
    recipes.forEach(renderRecipe);

}
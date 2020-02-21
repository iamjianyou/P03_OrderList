import {elements} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {elements.searchInput.value = '';};
export const clearResults = () => {elements.searchResList.innerHTML = '';
                                    elements.searchResPages.innerHTML = ''};




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



/** Render the recipe */
const renderRecipe = recipe => {

    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title, 18)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>

    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup)  
};

    // type: 'prev' or 'next'
    const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of currente page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
    
};
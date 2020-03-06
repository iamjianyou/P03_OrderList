import axios from 'axios';
import {proxy} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;

    }

    async getRecipe(){
        try {
            const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            
        }catch(error){
            console.log(error);
            alert(' bug found on id : (')
        }
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15
    }

     calcServings(){
         this.servings = 4;
     }

     parseIngredients(){
        const unitsLong = ['tablespoons', 'Tablespoon', 'ounce', 'ounces', 'teaspoon','teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        
        const newIngredients = this.ingredients.map(el => {
            // 1> Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);

            });


            // 2> Remove parentheses
            ingredient = ingredient.replace(/ *\[[^\]]*]/, '')

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objInt;

            if(unitIndex > -1){
                // there is a unit
                //EX. 4 1/2 cups, arrCount(4, 1/2) --> eval(" 4+1/2" ) ---> 4.5
                // ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex); 
                let count;
                if(arrCount.length === 1){ 
                    count = arrIng[0];
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

            }else if(parseInt(arrIng[0], 10)){ 
                // f.e parseInt('112', 10) retrun 112 which true, or parseInt('string', 10) returns NaN which is false
                // there is no unit, but 1st element is number
                objInt = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }

            }else if(unitIndex === -1){
                // there is no unit and no number in first position
                objInt = {
                    count: 1,
                    unit: '',
                    ingredient

                }
            }


            // 3> Parse ingredients into count, unit and ingredients
            return objInt;
            // 4>
         });
         this.ingredients = newIngredients;
     }
}
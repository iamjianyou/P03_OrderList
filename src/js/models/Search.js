import axios from 'axios';

export default class Search{
    // constructor
    

    constructor(query){
        this.query = query;
    }

    async getResults(query){
        const key = '4b03cd0c7ed2a6ee58ee3c88ab01c23c'
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes
            //console.log("the result ",this.result);
    
        } catch(error) {
    
            alert(error)
        }
    }
}


/**
import string from './models/Search';
 import Search from "./models/Search";
 import {add as a, multiply as m, ID} from './views/searchView'
 import * as searchView from './views/searchView';
 console.log(`using imported functions! ${a(ID,2)} and ${m(2, 3)}. ${Search}   `)
 console.log(`using imported functions! ${searchView.add(searchView.ID,2)} and ${searchView.multiply(2, 3)}. ${Search}   `)
*/

/** 
 * API
 * 
 * https://www.food2fork.com/F2F/user/api#
 * 4b03cd0c7ed2a6ee58ee3c88ab01c23c 
 */ 

/* *
    fetch: not support older v browsers
            2 steps: <1> wait for the data to come back
                        <2> wait it to convert to json
*   
* axios: support all browser http requests...
*       automacally Return json with ONE step
*/
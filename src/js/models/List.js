import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = [];
    }


    /**
     * Add new items to the List
     */
    addItem(count, unit, ingredient){
        const item = {
            id: uniqid(), // id is created based on uniqid lib
            count: count,
            unit: unit,
            ingredient: ingredient
        }
        this.items.push(item);
        return item;
    }

    /**
    * Delete a item
    * BY using ' splice ' : pass start_pos with number_of_pos to take
    * then return these el above and delete them from the original array or saying mutates the original one
    * eg.
    * splce(start, nrOfIncluded)
    * [2, 3, 4] splice(1, 1) -> returns 3, orignal array is [2, 4]
    * 
    * slice(start, end)
    * [2, 3, 4] slice(1, 1) -> returns 3, orignal array is [2, 4]
    */
    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1); // remove only one item
        // return this.items.splice(index, 1);  // to return the deleted item(s)
    }

    /**
     * Uppdate Count
     */
    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}
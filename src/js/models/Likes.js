
export default class Likes {
    constructor(){
        this.likes = [];
    }

    /** Add like */
    addLike(id, title, author, img){
        const like = {
            id,
            title,
            author, 
            img
        };

        this.likes.push(like);
        
        // Persist data in localStorage
        this.persistData();
        return like
    }

    /** remove like */
    removeLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    /** Check like status */
    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    /** get number of likes */
    getNumberLikes(){
        return this.likes.length;
    }

    /** Persist data */
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    /** read storeage */
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        // Restore likes from the local storage
        if (storage) this.likes = storage;

    }

}

export default class Likes {
    constructor(){
        this.likes = [];
    }

    /** Add like */
    addLikes(id, title, author, img){
        const like = {
            id,
            title,
            author, 
            img
        };

        this.likes.push(like);
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


}
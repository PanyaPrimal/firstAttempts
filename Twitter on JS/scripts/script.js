

class Twitter {
    constructor({ listElem }) {
        this.tweets = new Posts({});
        this.elements = {
            listElem: document.querySelector(listElem)
        }
    }

    renderPost() {

    }

    showUserPost() {

    }

    showLikesPost() {

    }

    showAllPost() {

    }

    openModal() {

    }
}

class Posts {
    constructor({ posts = [] }) {
        this.posts = posts;
    }

    addPost(tweet) {
        this.tweets.push(new Post(tweet));
    }
    deletePost(id) {

    }

    likePost(id) {

    }
}


class Post {
    constructor(param) {
        this.id = param.id
        this.userName = param.userName;
        this.nickname = param.nickname;
        this.postDate = param.postDate;
        this.test = param.test;
        this.img = param.img;
        this.likes = param.likes;
        this.liked = false;
    };

    changeLike() {
        this.liked = !this.liked;
        if (this.liked) {
            this.likes++;
        } else {
            this.likes--;
        }
    }
}

new Twitter({
    listElem: '.tweet-list'
})


const twitter = new Twitter({
    listElem: '.tweet-list'
})

console.log('twitter: ', twitter);
// Core
import { EventEmitter } from 'events';

// Instruments
import dispatcher from '../dispatcher';
import { FETCH_POSTS, STOP_SPINNING, START_SPINNING } from "../actions/types";

export default new class PostStore extends EventEmitter {
    constructor () {
        super();

        this.store = {
            posts: [],
            isSpinning: false,
        };

        dispatcher.register((action) => {
            console.log(action);
            switch (action.type) {
                case FETCH_POSTS: {
                    this.fetchPosts(action.payload);
                    break;
                }
                case START_SPINNING:
                case STOP_SPINNING: {
                    this.setSpinningState(action.payload);
                    break;
                }
                default:
                    return false;
            }
        });
    }

    subscribe (callback) {
        console.log('callback', callback);
        this.on('change', callback);
    }

    unsubscribe (callback) {
        this.removeListener('change', callback);
    }

    update () {
        console.log('store', this.store);
        this.emit('change');
    }

    getStore () {
        return this.store;
    }

    getPosts () {
        return this.store.posts;
    }

    getSpinningStatus () {
        return this.store.isSpinning;
    }

    fetchPosts (posts) {
        this.store.posts = posts;
        this.update();
    }

    setSpinningState (status) {
        this.store.isSpinning = status;
        this.update();
    }

}();
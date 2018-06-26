// Core
import React, { Component } from 'react';

// Instruments
import styles from './styles.m.css';
import { getUniqueID } from '../../instruments';
import { api } from '../../REST/api';

// Components
import Composer from '../../components/Composer/Composer';
import Post from '../../components/Post/Post';
import StatusBar from '../../components/StatusBar/StatusBar';
import Counter from '../../components/Counter/Counter';
import Catcher from '../../components/Catcher/Catcher';
import Spinner from '../Spinner/Spinner';

export default class Feed extends Component {
    state = {
        posts: [],
        isSpinning: false,
    };

    componentDidMount () {
        this._getPostsAcync();
    }

    _getPostsAcync = async () => {
        try {
            this._setPostsFetchingState(true);
            const posts = await api.fetchPosts();

            this.setState({
                posts,
                isSpinning: false,
            });
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState();
        }
    }

    _createPostAsync = async (comment) => {
        try {
            this._setPostsFetchingState(true);

            const post = await api.createPosts(comment);

            this.setState((prevState) => ({
                posts: [post, ...prevState.posts],
            }));

            // this.setState(({ posts })) => ({
            //     posts: [post, ...posts]
            // }));
        } catch ({ message }) {
            console.error(message)
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _setPostsFetchingState = (isSpinning) => {
        this.setState({
            isSpinning,
        });
    }

    render () {
        const { posts: userPosts, isSpinning } = this.state;

        const posts = userPosts.map((post) => (
            <Catcher key = { post.id }>
                <Post { ...post } />
            </Catcher>
        ));

        return (
            <section className = { styles.feed }>
                <StatusBar />
                <Composer
                    _createPostAsync = { this._createPostAsync }
                />
                <Counter count = { posts.length } />
                { posts }
                <Spinner isSpinning = { isSpinning } />
            </section>
        );
    }
}
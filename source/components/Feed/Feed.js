// Core
import React, { Component } from "react";
import gsap from "gsap";
import {
    Transition,
    CSSTransition,
    TransitionGroup
} from "react-transition-group";

// Instruments
import styles from "./styles.m.css";
import { api } from "../../REST/api";
import { GROUP_ID } from "../../REST/config";
import { socket } from "../../socket/init";

// Components
import Composer from "../../components/Composer/Composer";
import Post from "../../components/Post/Post";
import StatusBar from "../../components/StatusBar/StatusBar";
import Counter from "../../components/Counter/Counter";
import Catcher from "../../components/Catcher/Catcher";
import Spinner from "../Spinner/Spinner";
import Postman from "../Postman/Postman";

export default class Feed extends Component {
    state = {
        posts:      [],
        isSpinning: false,
        online:     false,
        isApper:    true,
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._getPostsAcync();

        // ----- Socket start

        socket.on("connect", () => {
            this.setState({
                online: true,
            });
        });
        socket.on("disconnect", () => {
            this.setState({
                online: false,
            });
        });
        socket.emit("join", GROUP_ID);

        socket.on("create", (postJSON) => {
            const { data: createPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createPost, ...posts],
                }));
            }
        });

        socket.on("like", (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map(
                        (post) => post.id === likedPost.id ? likedPost : post
                    ),
                }));
            }
        });

        socket.on("remove", (postJSON) => {
            const { data: removePost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removePost.id),
                }));
            }
        });
    }

    // ----- Socket end

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
    };

    _createPostAsync = async (comment) => {
        try {
            this._setPostsFetchingState(true);

            const post = await api.createPosts(comment);

            this.setState((prevState) => ({
                posts: [post, ...prevState.posts],
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }
    };

    _likePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);

            const likePost = await api.likePost(id);

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === id ? likePost : post),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }
    };

    _removePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);

            await api.removePost(id);

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostsFetchingState(false);
        }
    };

    _setPostsFetchingState = (isSpinning) => {
        this.setState({
            isSpinning,
        });
    };

    // ----- Animations start

    _animateComposerAppear = (composer) => {
        gsap.fromTo(
            composer,
            1.3,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0 }
        );
    };

    _animatePostmanApper = (postman) => {
        gsap.fromTo(
            postman,
            1,
            { opacity: 0, x: 400 },
            { opacity: 1, x: 0, onComplete: this._isApper }
        );
    };

    _isApper = () => {
        setTimeout(() => {
            this.setState({
                isApper: false,
            });
        }, 5000);
    };

    _animatePostmanDisApper = (postman) => {
        gsap.fromTo(postman, 1, { opacity: 1, x: 0 }, { opacity: 0, x: 400 });
    };

    // ----- Animation end

    render () {
        const { posts: userPosts, isSpinning, online, isApper } = this.state;

        const posts = userPosts.map((post) => (
            <CSSTransition
                classNames = { {
                    enter:       styles.postInStart,
                    enterActive: styles.postInEnd,
                    exit:        styles.postOutStart,
                    exitActive:  styles.postOutEnd,
                } }
                key = { post.id }
                timeout = { { enter: 500, exit: 400 } }>
                <Catcher>
                    <Post
                        { ...post }
                        _likePostAsync = { this._likePostAsync }
                        _removePostAsync = { this._removePostAsync }
                    />
                </Catcher>
            </CSSTransition>
        ));

        return (
            <section className = { styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar online = { online } />
                <Transition
                    appear
                    in
                    timeout = { 1300 }
                    onEnter = { this._animateComposerAppear }>
                    <Composer _createPostAsync = { this._createPostAsync } />
                </Transition>
                <Counter count = { posts.length } />
                <TransitionGroup>{posts}</TransitionGroup>
                <Transition
                    appear
                    in = { isApper }
                    timeout = { 1000 }
                    onEnter = { this._animatePostmanApper }
                    onExit = { this._animatePostmanDisApper }>
                    <Postman />
                </Transition>
            </section>
        );
    }
}

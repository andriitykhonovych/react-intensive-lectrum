// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Instruments
import styles from "./styles.m.css";
import { withProfile } from "../HOC/withProfile";

class Like extends Component {
    static propTypes = {
        _likePostAsync: PropTypes.func.isRequired,
        id:             PropTypes.string.isRequired,
        like:           PropTypes.arrayOf(
            PropTypes.shape({
                firstName: PropTypes.string.isRequired,
                lastName:  PropTypes.string.isRequired,
            })
        ),
    };

    static defaultProps = {
        likes: [],
    };

    state = {
        showLikers: false,
    };

    _showLikers = () => {
        this.setState({
            showLikers: true,
        });
    };

    _hideLikers = () => {
        this.setState({
            showLikers: false,
        });
    };

    _likePost = () => {
        const { _likePostAsync, id } = this.props;

        _likePostAsync(id);
    };

    _getLikeByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => {
            return (
                `${firstName} ${lastName}` ===
                `${currentUserFirstName} ${currentUserLastName}`
            );
        });
    };

    _getLikeStyles = () => {
        const likedByMe = this._getLikeByMe();

        return classNames(styles.icon, {
            [styles.liked]: likedByMe,
        });
    };

    _getLikersList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id }>{`${firstName} ${lastName}`}</li>
        ));

        return likes.length && showLikers ? <ul>{likesJSX}</ul> : null;
    };

    _getLikesDescription = () => {
        const { likes, currentUserFirstName, currentUserLastName } = this.props;

        const likedByMe = this._getLikeByMe();

        let result = likes.length;

        if (likes.length === 1 && likedByMe) {
            result = `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            result = `You and 1 other`;
        } else if (likedByMe) {
            result = `You and ${likes.length - 1} others`;
        }

        return result;
    };

    render () {
        const likes = this._getLikersList();
        const likeStyles = this._getLikeStyles();
        const likesDercription = this._getLikesDescription();

        return (
            <section className = { styles.like }>
                <span className = { likeStyles } onClick = { this._likePost }>
                    Like
                </span>
                <div>
                    {likes}
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        {likesDercription}
                    </span>
                </div>
            </section>
        );
    }
}

export default withProfile(Like);

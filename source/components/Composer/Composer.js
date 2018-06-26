// Core
import React, { Component } from "react";
import PropTypes from 'prop-types';

// Instruments
import styles from "./styles.m.css";

// Copmonents
import { withProfile } from "../HOC/withProfile";

export class Composer extends Component {

    static propTypes = {
        avatar: PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
    }

    state = {
        comment: '',
    };

    _handleFormSubmit = (e) => {
        e.preventDefault();
        this._submitComment();
    }

    _updateComment = (e) => {
        const { value: comment } = e.target;
        this.setState ({ comment });
    }

    _submitComment = () => {
        const { comment } = this.state;

        if (!comment) {
            return null;
        }

        const { _createPostAsync } = this.props;

        _createPostAsync(comment);
        this.setState ({ comment: '' });
    }

    _noCopyText = (e) => {
        e.preventDefault();
    }

    _onSubmitCommentOnEnter = (e) => {
        const enterKey = e.key === 'Enter';

        if (enterKey) {
            e.preventDefault();
            this._submitComment();
        }
    }

    render () {
        const { comment } = this.state;
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { styles.composer }>
                <img src = { avatar } />
                <form onSubmit = { this._handleFormSubmit } >
                    <textarea
                        placeholder = { `what is your mind ${currentUserFirstName}` }
                        value = { comment }
                        onChange = { this._updateComment }
                        onCopy = { this._noCopyText }
                        onKeyPress = { this._onSubmitCommentOnEnter }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer);
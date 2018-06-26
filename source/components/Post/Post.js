// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

// Instruments
import styles from "./styles.m.css";

// Copmonents
import { withProfile } from "../HOC/withProfile";
import Like from "../../components/Like/Like";

export class Post extends Component {
    static propTypes = {
        _removePostAsync:     PropTypes.func.isRequired,
        _likePostAsync:       PropTypes.func.isRequired,
        comment:              PropTypes.string.isRequired,
        avatar:               PropTypes.string.isRequired,
        firstName:            PropTypes.string.isRequired,
        lastName:             PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
        created:              PropTypes.number.isRequired,
    };

    _removePost = () => {
        const { _removePostAsync, id } = this.props;

        _removePostAsync(id);
    };

    _getCross = () => {
        const {
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return `${currentUserFirstName} ${currentUserLastName}` ===
            `${firstName} ${lastName}` ? (
                <span onClick = { this._removePost } className = { styles.cross } />
            ) : null;
    };

    render () {
        const {
            comment,
            created,
            avatar,
            firstName,
            lastName,
            _likePostAsync,
            id,
            likes,
        } = this.props;

        const cross = this._getCross();

        return (
            <section className = { styles.post }>
                {cross}
                <img src = { avatar } />
                <a href = '#'>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format("MMMM D h:mm:ss a")}</time>
                <pre>{comment}</pre>
                <Like _likePostAsync = { _likePostAsync } id = { id } likes = { likes } />
            </section>
        );
    }
}

export default withProfile(Post);

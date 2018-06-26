// Core
import React, { Component } from "react";
import PropTypes from 'prop-types';
import moment from "moment";

// Instruments
import styles from "./styles.m.css";

// Copmonents
import { withProfile } from "../HOC/withProfile";

export class Post extends Component {

    static propTypes = {
        comment: PropTypes.string,
        avatar: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName: PropTypes.string.isRequired,
    }

    _getCross = () => {

        const {
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
        } = this.props

        return `${currentUserFirstName} ${currentUserLastName}` === `${firstName} ${lastName}`
            ? <span className = { styles.cross } />
            : null
    }

    render () {
        const { comment, created, avatar, firstName, lastName } = this.props;

        const cross = this._getCross();

        return (
            <section className = { styles.post }>
                { cross }
                <img src = { avatar } />
                <a href = '#'>{ `${firstName} ${lastName}` }</a>
                <time>{ moment.unix(created).format("MMMM D h:mm:ss a") }</time>
                <p>{ comment }</p>
            </section>
        );
    }
}

export default withProfile(Post);

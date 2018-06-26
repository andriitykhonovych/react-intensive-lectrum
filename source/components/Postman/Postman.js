// Core
import React, { Component } from "react";
import PropTypes from "prop-types";

// Instruments
import styles from "./styles.m.css";

// Copmonents
import { withProfile } from "../HOC/withProfile";

export class Postman extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
    };

    render () {
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { styles.postman }>
                <img src = { avatar } />
                <span>
                    Welcome online, <b>{currentUserFirstName} !</b>
                </span>
            </section>
        );
    }
}

export default withProfile(Postman);

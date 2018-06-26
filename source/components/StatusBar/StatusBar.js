// Core
import React, { Component } from "react";
import PropsPypes from "prop-types";
import classNames from "classnames";

// Instruments
import styles from "./styles.m.css";
import { withProfile } from "../HOC/withProfile";

export class StatusBar extends Component {
    static propTypes = {
        avatar:               PropsPypes.string.isRequired,
        currentUserFirstName: PropsPypes.string.isRequired,
        currentUserLastName:  PropsPypes.string.isRequired,
        online:               PropsPypes.bool.isRequired,
    };

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
            online,
        } = this.props;

        const statusString = online ? "Online" : "Offline";

        return (
            <section className = { styles.statusBar }>
                <div
                    className = { classNames(styles.status, {
                        [styles.online]:  online,
                        [styles.offline]: !online,
                    }) }>
                    <div>{statusString}</div>
                    <span />
                </div>
                <button>
                    <img src = { avatar } />
                    <span>{currentUserFirstName}</span>
                    &nbsp;
                    <span>{currentUserLastName}</span>
                </button>
            </section>
        );
    }
}

export default withProfile(StatusBar);

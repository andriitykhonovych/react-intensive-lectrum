// Core
import React, { Component } from 'react';

// Instruments
import  styles from './styles.m.css';
import PropTypes from 'prop-types';

export default class Catcher extends Component {
    static  propTypes = {
        children: PropTypes.object.isRequired,
    }

    state = {
        error: false,
    }

    componentDidCatch (error, info) {
        this.setState({
            error: true,
        })
    }

    render () {
        const { error } = this.state;
        const { children } = this.props;

        if(error) {
            return (
                <section className = { styles.catcher }>
                    <span>A mysterious 👽 &nbsp;error 📛 &nbsp;occured.</span>
                    <p>
                        Our space 🛰 &nbsp;engineers strike team 👩🏼‍🚀 👨🏼‍🚀 &nbsp;is
                        already working 🚀 &nbsp;in order to fix that for you!
                    </p>
                </section>
            );
        }

        return children;
    }
}
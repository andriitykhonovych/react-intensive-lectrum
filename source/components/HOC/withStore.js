import React, { Component } from "react";
import postStore from '../../flux/store/';

const withStore = (Enhanceable) =>
    class WithStore extends Component {
        state = postStore.getStore();

        componentDidMount () {
            postStore.subscribe(this._onStoreChange);
            // setTimeout(() => {
            //     this.setState({
            //         posts: [],
            //     })
            // }, 3000)
        };

        componentWillUnmount () {
            postStore.unsubscribe(this._onStoreChange);
        };

        _onStoreChange = () => {
            const store = postStore.getStore();
            this.setState ({
                ...store,
            });
        };

        render () {
            return (
                <Enhanceable { ...this.state } { ...this.props } />
            );
        }
    };

export { withStore };

// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";

// Instruments
import avatar from "../../theme/assets/homer.png";

// Components
import Feed from "../../components/Feed/Feed";
import Catcher from "../../components/Catcher/Catcher";
import { Provider } from "../../components/HOC/withProfile";

const options = {
    avatar,
    currentUserFirstName: "Андрей",
    currentUserLastName:  "Тихонович",
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed { ...options } />
                </Provider>
            </Catcher>
        );
    }
}

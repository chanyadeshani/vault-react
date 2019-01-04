import React, {Component} from 'react';
import './App.css';
import LeftDrawer from "./components/leftDrawer";
import {connect} from 'react-redux';
import {addToken, removeToken} from "./actions";

class App extends Component {
    render() {
        return (
            <div>
                <LeftDrawer/>
            </div>
        );
    }
}

export default connect(
    state =>
        ({
            token: state.token
        }),
    dispatch =>
        ({
            setToken(token) {
                dispatch(addToken(token));
            },
            deleteToken(token) {
                dispatch(removeToken(token));
            }
        })
)(App);
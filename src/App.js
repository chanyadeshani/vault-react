import React, {Component} from 'react';
import './App.css';
import LeftDrawer from "./components/leftDrawer";


class App extends Component {

    state = {
        token: localStorage.getItem("token") !== null ? localStorage.getItem("token") : ''
    };

    constructor() {
        super();
        this.setToken = this.setToken.bind(this);
        this.deleteToken = this.deleteToken.bind(this);
    }

    render() {
        return (
            <div>
                <LeftDrawer
                    token={this.state.token}
                    setToken={this.setToken}
                    deleteToken={this.deleteToken}
                />
            </div>
        );
    }

    setToken(token) {
        this.setState({token});
        localStorage.setItem('token', token);
    }

    deleteToken() {
        this.setState({token: ''});
        localStorage.removeItem('token');
    }
}

export default App;
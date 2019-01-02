import React, {Component} from 'react';
import './App.css';
import LeftDrawer from "./components/leftDrawer";


class App extends Component {

    state = {
        token: '',
    };

    constructor() {
        super();
        this.setToken = this.setToken.bind(this);
    }

    render() {
        return (
            <div>
                <LeftDrawer
                    token={this.state.token}
                    setToken={this.setToken}
                />
            </div>
        );
    }

    setToken(token) {
        this.setState({token});
        localStorage.setItem('token', token);
    }
}

export default App;
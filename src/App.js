import React, {Component} from 'react';
import './App.css';
import LeftDrawer from "./components/leftDrawer";

const domainName = "https://fandoco-vault.herokuapp.com";

class App extends Component {

    state = {
        token: null,
        loginStatus: '',
        tries: 0

    };

    constructor() {
        super();
        this.checkLogin = this.checkLogin.bind(this);
    }

    render() {
        return (
            <div>
                <LeftDrawer
                    checkLogin={this.checkLogin}
                    loginStatus={this.state.loginStatus}
                    tries={this.state.tries}
                />
            </div>
        );
    }

    checkLogin(username, password) {

        let url = domainName + "/login";
        let body = "{\"userName\" : \"" + username + "\",\"password\" : \"" + password + "\"}";

        let postReq = new XMLHttpRequest();
        postReq.open('POST', url, true);
        postReq.setRequestHeader('Content-type', 'application/json');
        postReq.send(body);
        postReq.onreadystatechange = () => {//Call a function when the state changes.
            if (postReq.readyState === 4 && postReq.status === 200) {
                let token = postReq.getResponseHeader("Authorization");

                this.setState({token: token, loginStatus: 'success', tries: this.state.tries + 1});
                localStorage.setItem('token', token);
            }
            if (postReq.readyState === 4 && postReq.status !== 200) {

                this.setState({token: null, loginStatus: 'failure', tries: this.state.tries + 1});
            }
        }

    }

}

export default App;
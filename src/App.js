import React, {Component} from 'react';
import './App.css';

import LeftDrawer from "./components/leftDrawer";

const domainName = "https://fandoco-vault.herokuapp.com";

class App extends Component {

    state = {
        token: null

    };

    constructor() {
        super();
        this.checkLogin = this.checkLogin.bind(this);
    }

    render() {
        return (
            <div>
                <LeftDrawer
                    checkLogin={this.checkLogin}/>
            </div>
        );
    }

    checkLogin(username, password) {

        let url = domainName + "/login";
        let body = "{\"userName\" : \"" + username + "\",\"password\" : \"" + password + "\"}";

        let postreq = new XMLHttpRequest();
        postreq.open('POST', url, true);
        postreq.setRequestHeader('Content-type', 'application/json');
        postreq.send(body);
        let token = false;
        postreq.onreadystatechange = () => {//Call a function when the state changes.
            if (postreq.readyState === 4 && postreq.status === 200) {
                token = postreq.getResponseHeader("Authorization");
                this.setState({token});
                console.log('Logged in', token);
            }
            if (postreq.readyState === 4 && postreq.status !== 200) {
                console.log('Wrong Password!');
                // this.setState({token});
            }
        }

    }

}

export default App;


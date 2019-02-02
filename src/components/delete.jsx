import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import TypesDropdown from "./typesDropdown";
import KeysDropdown from "./keysDropdown";

const domainName = "https://fandoco-vault.herokuapp.com";

const styles = theme => ({

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: '#562a66',
    },
});
const ColoredLine = ({color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

class Delete extends React.Component {
    state = {
        key: '',
        type: '',
    };

    deleteType = () => {

        let type = this.state.type;
        let url = domainName + "/types";
        let body = "{\"name\" : \"" + type + "\"}";
        let postreq = new XMLHttpRequest();
        postreq.open('DELETE', url, true);
        postreq.setRequestHeader("Authorization", localStorage.getItem('token'));
        postreq.setRequestHeader('Content-type', 'application/json');
        postreq.send(body);

        postreq.onreadystatechange = () => {//Call a function when the state changes.
            if (postreq.readyState === 4 && postreq.status === 200) {

            }
        };
    };

    deleteKey = () => {
        let key = this.state.newType;
        let url = domainName + "/data";
        let body = "{\"name\" : \"" + key + "\"}";

        let postreq = new XMLHttpRequest();
        postreq.open('POST', url, true);
        postreq.setRequestHeader("Authorization", localStorage.getItem('token'));
        postreq.setRequestHeader('Content-type', 'application/json');
        postreq.send(body);

        postreq.onreadystatechange = () => {//Call a function when the state changes.
            if (postreq.readyState === 4 && postreq.status === 200) {
            }
        };
    };
    onselectType = () => {
        console.log("Types Dropdown called");
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <p>Delete a Type</p>
                <TypesDropdown
                    onselectType={this.onselectType}
                    deleteType={this.deleteType}
                />
                <Button
                    width="100px"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.deleteType}
                >Delete </Button>
                <ColoredLine color="555555"/>
                <p>Delete a Key</p>
                <TypesDropdown
                    onselectType={this.onselectType}
                />
                <KeysDropdown
                    onselectKey={this.onselectKey}
                    deleteKey={this.deleteKey}
                />
                <Button
                    width="100px"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.deleteKey}
                >Delete </Button>
            </div>
        );
    }
}

Delete.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(DataList);
export default withStyles(styles)(Delete);
import React from 'react';
import TypesDropdown from "./typesDropdown";
import InputField from "./inputField";
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import classNames from "classnames";
import TextField from '@material-ui/core/TextField';

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

class Add extends React.Component {
    state = {
        key: '',
        value: '',
        type: '',
        newType: ''
    };
    addValue = () => {
        {

            let newKey = this.state.key;
            let newValue = this.state.value;
            let selectedType = this.state.type;
            if (newKey === '' || newValue === '' || selectedType === '') {
                return;
            }
            let url = domainName + "/data";
            let body = "{\"type\" : \"" + selectedType + "\",\"key\" : \"" + newKey + "\",\"value\" : \"" + newValue + "\"}";

            let postreq = new XMLHttpRequest();
            postreq.open('POST', url, true);
            postreq.setRequestHeader("Authorization", localStorage.getItem('token'));
            postreq.setRequestHeader('Content-type', 'application/json');
            postreq.send(body);

            postreq.onreadystatechange = () => {//Call a function when the state changes.
                if (postreq.readyState === 4 && postreq.status === 200) {
                    //Todo show a message
                    // this.setState({key: ''});
                    // this.setState({value: ''});

                }
            };
        }

    };

    AddType = () => {
        let newType = this.state.newType;
        let url = domainName + "/types";
        let body = "{\"name\" : \"" + newType + "\"}";

        let postreq = new XMLHttpRequest();
        postreq.open('POST', url, true);
        postreq.setRequestHeader("Authorization", localStorage.getItem('token'));
        postreq.setRequestHeader('Content-type', 'application/json');
        postreq.send(body);

        postreq.onreadystatechange = () => {//Call a function when the state changes.
            if (postreq.readyState === 4 && postreq.status === 200) {
                this.setState({newType: ''});
            }
        };
    };

    setInput = (name, value) => {
        this.setState({[name]: value});
    };
    onselectType = value => {
        this.setState({type: value});
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });

    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <p>Add a new entry with Key and Value to the selected type</p>
                <TypesDropdown
                    onselectType={this.onselectType}
                />
                <InputField
                    setInput={this.setInput}
                />
                <Button
                    width="100px"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.addValue}
                >Add </Button>
                <ColoredLine color="black"/>
                <p>Add a new Type</p>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        id="addType"
                        label="Type"
                        value={this.state.newType}
                        onChange={this.handleChange('newType')}
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="outlined"
                    />
                </form>
                <Button
                    width="100px"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.AddType}
                >Add </Button>
            </div>
        );
    }

}

Add.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(DataList);
export default withStyles(styles)(Add);
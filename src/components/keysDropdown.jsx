import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {withStyles} from "@material-ui/core";

const domainName = "https://fandoco-vault.herokuapp.com";
const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 80,
    },
});

class KeysDropdown extends Component {
    state = {
        type: '',
        open: false,
        types: ['Select a type']
    };

    constructor() {
        super();
        this.populateTypesDropdown();
    }

    setTypes = (types) => {
        this.setState({types: types});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    populateTypesDropdown() {
        let url2 = domainName + "/types";

        //Fetch the content of the url using the XMLHttpRequest object
        let req2 = new XMLHttpRequest();
        req2.open("GET", url2);
        req2.setRequestHeader("Authorization", localStorage.getItem('token'));
        req2.send(null);

        //register an event handler function
        req2.onreadystatechange = () => {
            if (req2.readyState === 4 && req2.status === 200) {

                let response = req2.responseText;
                let types = JSON.parse(response);
                this.setState({types: types});
            }
        };
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <form autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="open-select">Key</InputLabel>
                        <Select
                            open={this.state.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={this.state.key}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'key',
                                id: 'open-select',
                            }}
                        >
                            {
                                this.state.types.map((text, index) => (
                                    <MenuItem key={index} value={text}>{text}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(KeysDropdown);

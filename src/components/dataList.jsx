import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const domainName = "https://fandoco-vault.herokuapp.com";

const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class DataList extends React.Component {
    state = {
        type: '',
        open: false,
        types: ['Select a type']
    };

    constructor() {
        super();
        this.populateTypesDropdown()
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
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
            console.log('Dropdown', req2.readyState);
            if (req2.readyState === 4 && req2.status === 200) {
                console.log('Dropdown', req2.status);

                let response = req2.responseText;
                let types = JSON.parse(response);
                this.setState({types: types});
            }
        };
    };

    setTypes = (types) => {
        this.setState({types: types});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        const {classes} = this.props;

        return (
            <form autoComplete="off">
                <Button className={classes.button} onClick={this.handleOpen}>
                    Select a Type to get data
                </Button>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="demo-controlled-open-select">Type</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.type}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'type',
                            id: 'demo-controlled-open-select',
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
        );
    }
}

DataList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataList);

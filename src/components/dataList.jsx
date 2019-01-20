import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DataTable from './dataTable';

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
        types: ['Select a type'],
        data: [],
    };

    constructor() {
        super();
        this.populateTypesDropdown();
    }

    static addToDataTable(key, value) {

        const table = document.getElementById("dataTable");

        const row = table.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        cell1.innerHTML = key;
        cell2.innerHTML = value;
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.getDatabyType(event.target.value);
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

    getDatabyType = (type) => {
        
        let url1 = domainName + "/data?type=" + type;
        //Fetch the content of the url using the XMLHttpRequest object
        let req1 = new XMLHttpRequest();
        req1.open("GET", url1);
        req1.setRequestHeader("Authorization", localStorage.getItem('token'));

        req1.send(null);

        //register an event handler function
        req1.onreadystatechange = () => {
            if (req1.readyState === 4 && req1.status === 200) {
                let response = req1.responseText;
                let listOfSecureDetails = JSON.parse(response);

                let dataArray = listOfSecureDetails.map((item, index) => ({
                    id: index,
                    key: item.key,
                    value: item.value
                }));
                this.setState({data: dataArray});
                console.log('data array', dataArray);
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
            <div>
                <form autoComplete="off">
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
                <DataTable
                    data={this.state.data}
                />
            </div>
        );
    }
}

DataList.propTypes = {
    classes: PropTypes.object.isRequired,
    // token: PropTypes.string
};

export default withStyles(styles)(DataList);

// export default connect(
//     state =>
//         ({
//             // token: state.token
//         })
// )(withStyles(styles))(DataList);
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class InputField extends React.Component {
    state = {
        key: '',
        value: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        this.props.setInput(name, event.target.value);
    };

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">

                <TextField
                    required
                    id="addKey"
                    label="Key"
                    value={this.state.key}
                    onChange={this.handleChange('key')}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    required
                    id="addVal"
                    label="Value"
                    value={this.state.value}
                    onChange={this.handleChange('value')}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                />
            </form>
        );
    }
}

InputField.propTypes = {
    classes: PropTypes.object.isRequired,
    setInput: PropTypes.func.isRequired
};

export default withStyles(styles)(InputField);

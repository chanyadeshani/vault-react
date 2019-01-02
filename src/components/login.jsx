import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';

const domainName = "https://fandoco-vault.herokuapp.com";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: '#562a66',
    },
});

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        showPassword: false,
    };

    constructor() {
        super();
        this.checkLogin = this.checkLogin.bind(this);
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

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

                this.props.setToken(token);
                this.props.handleDrawerOpen();
                this.props.showLoginMessage("success");
            }
            if (postReq.readyState === 4 && postReq.status !== 200) {
                this.props.showLoginMessage("failure");
            }
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="username"
                                className={classNames(classes.margin, classes.textField)}
                                variant="outlined"
                                type='text'
                                label="Username"
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="password"
                                className={classNames(classes.margin, classes.textField)}
                                variant="outlined"
                                type={this.state.showPassword ? 'text' : 'password'}
                                label="Password"
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => this.checkLogin(this.state.username, this.state.password)}
                        >
                            Login </Button>
                    </form>
                </Paper>
            </main>
        );
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    setToken: PropTypes.func.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    showLoginMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
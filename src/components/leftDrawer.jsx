import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HelpIcon from '@material-ui/icons/Help';
import ListIcon from '@material-ui/icons/List';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import ExitIcon from '@material-ui/icons/ExitToApp';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Login from './login';
import PopupMessages from './popupMessages'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#562a66',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class LeftDrawer extends React.Component {
    state = {
        open: this.props.token !== '',
        loginMessage: '',
        tries: 0
    };

    static getListIcon(index) {
        switch (index) {
            case 'List':
                return <ListIcon/>;
            case 'Add':
                return <AddBoxIcon/>;
            case 'Edit':
                return <EditIcon/>;
            case 'Delete':
                return <DeleteForeverIcon/>;
            default:
                return <AccessAlarmIcon/>;
        }
    }

    handleOnClickListItem = (listText) => {
        switch (listText) {
            case 'List':
                console.log('List Clicked');
                break;
            case 'Add':
                console.log('Add Clicked');
                break;
            case 'Edit':
                console.log('Edit Clicked');
                break;
            case 'Delete':
                console.log('Delete Clicked');
                break;
            case 'Help':
                console.log('Help Clicked');
                break;
            case 'Logout':
                this.props.deleteToken();
                this.setState({open: false, loginMessage: ''});
                break;
            default:
                console.log('Switch default');
        }
    };

    handleDrawerOpen = () => {
        let token = this.props.token;
        if (token !== '') {
            this.setState({open: true});
        }
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    showLoginMessage = (loginStatus) => {
        this.setState((prevState) => ({tries: prevState.tries + 1, loginMessage: loginStatus}));
    };

    showPopup() {
        if (this.state.loginMessage !== '') {
            return (<PopupMessages variant={this.getVariant()}
                                   message={this.getMessage()}
                                   key={this.state.tries}
                                   clearMessage={this.clearLoginMessage}
            />);
        }
    };

    clearLoginMessage = () => {
        this.setState({loginMessage: ''});
    };

    getMessage() {
        if (this.state.loginMessage === 'success') {
            return 'Login Successful!';
        } else {
            return 'Username or Password invalid!';
        }
    }

    getVariant() {
        if (this.state.loginMessage === 'success') {
            return "success";
        } else {
            return 'error';
        }
    }

    render() {
        const {classes, theme} = this.props;
        const open = this.state.open;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h4" color="inherit" noWrap>
                            Vault
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {['List', 'Add', 'Edit', 'Delete'].map((text, index) => (
                            <ListItem button onClick={() => this.handleOnClickListItem(text)} key={text}>
                                <ListItemIcon>{LeftDrawer.getListIcon(text)}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        {['Help', 'Logout'].map((text, index) => (
                            <ListItem button key={text} onClick={() => this.handleOnClickListItem(text)}>
                                <ListItemIcon>{index % 2 === 0 ? <HelpIcon/> : <ExitIcon/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>

                    <FillBody
                        token={this.props.token}
                        setToken={this.props.setToken}
                        handleDrawerOpen={this.handleDrawerOpen}
                        showLoginMessage={this.showLoginMessage}
                    />
                    {this.showPopup()}
                </main>
            </div>
        );
    }
}

LeftDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    setToken: PropTypes.func.isRequired,
    deleteToken: PropTypes.func.isRequired
};


function FillBody(props) {
    let token = props.token;
    if (token === '') {
        return (<Login
            setToken={props.setToken}
            handleDrawerOpen={props.handleDrawerOpen}
            showLoginMessage={props.showLoginMessage}
        />);
    } else {
        return null;
    }
}

export default withStyles(styles, {withTheme: true})(LeftDrawer);
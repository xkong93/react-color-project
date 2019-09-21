import React, {Component} from 'react'
import {Link} from "react-router-dom"
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import PaletteMetaForm from "./PaletteMetaForm"

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Button from '@material-ui/core/Button';


const drawerWidth = 400;


const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
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
    navBtns: {
        marginRight: "1rem",


    },
    button1: {
        marginTop: "12px",
        marginRight: "10px"


    },

    button2: {
        marginTop: "12px"

    },
    link: {
      textDecoration: "none"
    }

})

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newColorName: "",
            formShowing: false
        }
    }

    showForm = () => {
        this.setState({
            formShowing: true
        })
    }


    render() {
        const {classes, open,palettes,handleSubmit} = this.props
        const {newPaletteName} = this.state
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    color="default"
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Create A Palette
                        </Typography>


                    </Toolbar>
                    <div className={classes.navBtns}>

                        <Link className={classes.link} to={'/'}>
                            <Button className={classes.button1} variant='contained' color='secondary' >
                                Back</Button>
                        </Link>
                        <Button className={classes.button2} variant="contained" color="primary" onClick={this.showForm}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                {this.state.formShowing && (<PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit}/>)}

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);

import React from 'react';
import {Link} from "react-router-dom"
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ChromePicker} from "react-color"
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator"
import DraggableColorList from "./DraggableColorList"
import {arrayMove} from 'react-sortable-hoc'
import ColorPickerForm from './ColorPickerForm'

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
        height: "calc(100vh - 64px)",
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

class PersistentDrawerLeft extends React.Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            colors: this.props.palettes[0].colors,
            newPaletteName: "",

        }
    }



    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    addNewColor = (newColor) => {

        this.setState({colors: [...this.state.colors, newColor], newColorName: ""})
    }

    addRandomColor = () => {
        //pick random color from exisiting palettes
        const allColors = this.props.palettes.map ( p =>
            p.colors
        ).flat()

        var rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        this.setState({
            colors: [...this.state.colors,randomColor]
        })
    }


    clearColors = () => {
        this.setState({
            colors:[],
        })
    }
    handleSubmit = (newPaletteName) => {
        const newPalette =
            {
                paletteName: newPaletteName,
                id: newPaletteName.toLowerCase().replace(/ /g, "-"),
                colors: this.state.colors
            }
        this.props.savePalette(newPalette);
        this.props.history.push("/")
    }

    removeColor = (coloraName) => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== coloraName)
        })
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState( ({colors}) =>  {
            return {colors: arrayMove(colors, oldIndex, newIndex)}
        })
    }


    render() {
        const {classes, theme,maxColors,palettes} = this.props;
        const {open, colors} = this.state;
        const  paletteIsFull = colors.length >= maxColors
        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    classes={classes}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}

                />
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
                    <Typography variant="h4">Design your palette</Typography>
                    <div>
                        <Button variant="contained" color="secondary" onClick={this.clearColors}>Clear Palette</Button>
                        <Button variant="contained" color="primary" onClick={this.addRandomColor} disabled={paletteIsFull}>Random Color</Button>
                    </div>

                <ColorPickerForm colors={colors} paletteIsFull={paletteIsFull} addNewColor={this.addNewColor}/>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    <DraggableColorList
                        colors={this.state.colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(PersistentDrawerLeft);

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import MiniPalette from "./MiniPalette"
import {withStyles} from "@material-ui/styles"
import styles from "./styles/PaletteListStyles"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import Avatar from '@material-ui/core/Avatar';
import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

class PaletteList extends Component {
    constructor(props){
        super(props)
        this.state = {
            openDeleteDialog: false,
            deleteingId:''
        }
    }

    openDialog = (id) => {
        this.setState({
            openDeleteDialog: true,
            deleteingId:id
        })
    }
    closeDialog = () => {
        this.setState({
            openDeleteDialog: false,
            deleteingId:''
        })
    }
    handleDelete = () => {
        this.props.deletePalette(this.state.deleteingId)
        this.closeDialog()
    }
    goToPalette = (id) => {
        // console.log(id)
        console.log(this.props)

        this.props.routerProps.history.push(`/palette/${id}`)
    }

    render() {
        const {palettes, classes, deletePalette} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create New</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette =>
                            <MiniPalette palette={palette}
                                         goToPalette={this.goToPalette}
                                         openDialog={this.openDialog}
                                         key={palette.id}
                                         id={palette.id}

                            />)}
                        {/*//handleClick={this.goToPalette}*/}
                    </div>
                </div>
                <Dialog open={this.state.openDeleteDialog}

                        onClose={this.closeDialog}
                        aria-labelledby='delete-dialog-title'>
                    <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: blue[100],color:blue[600]}}>
                                    <CheckIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete"/>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: red[100],color:red[600]}}>
                                    <CloseIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel"/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);

import React, {PureComponent} from 'react'
import {withStyles} from "@material-ui/styles"
import styles from './styles/MiniPaletteStyles'
import DeleteIcon from "@material-ui/icons/Delete"

class MiniPalette extends PureComponent {
    constructor(props){
        super(props);

    }

    deletePalette = (e) => {
        e.stopPropagation()
        this.props.openDialog(this.props.id)
    }

    handleClick = () => {
        this.props.goToPalette(this.props.id)
    }
    render () {
        console.log("renderding" + this.props.palette)
        const {classes, palette,handleClick} = this.props;
        const miniColorBoxes = palette.colors.map(color =>
            <div
                className={classes.miniColor}
                key={color.name}
                style={{backgroundColor:color.color}}>

            </div> )
        return (
            <div className={classes.root} onClick={this.handleClick}>
                <div className={classes.delete}>
                    <DeleteIcon
                        className={classes.deleteIcon}
                        style={{transition: "all 0.3s ease-in-out"}}
                        onClick={this.deletePalette}
                    />
                </div>
                <div className={classes.colors}>{miniColorBoxes}</div>
                <h5 className={classes.title}>
                    {palette.paletteName}<span className={classes.emoji}>{palette.emoji}</span>
                </h5>
            </div>
        )
    }

}

export default withStyles(styles)(MiniPalette);

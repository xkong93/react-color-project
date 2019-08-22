import React from 'react'
import {withStyles} from "@material-ui/styles"
import styles from './styles/MiniPaletteStyles'


function MiniPalette({classes, palette,handleClick}) {
    const miniColorBoxes = palette.colors.map(color =>
        <div
            className={classes.miniColor}
            key={color.name}
            style={{backgroundColor:color.color}}>

        </div> )
    console.log(palette.id)
    return (
        <div  className={classes.root} onClick={handleClick}>
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
                {palette.paletteName}<span className={classes.emoji}>{palette.emoji}</span>
            </h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);

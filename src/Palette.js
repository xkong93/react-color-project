import React, {Component} from 'react'
import ColorBox from './ColorBox'
import NavBar from './NavBar'
import './Palette.css'
import PaletteFooter from "./PaletteFooter"
import {withStyles} from "@material-ui/styles"

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    colors: {
        height: "90%",
    },

    footer: {
        backgroundColor: "white",
        height: "5vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontWeight: "bold",
    },

    emoji: {
        fontSize: "1.5rem",
        margin: "0 1rem",
    }
}


class Palette extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: "hex"
        }
        // this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel = (newLevel) => {
        this.setState({level: newLevel})
    }

    changeFormat = (val) => {
        this.setState({format: val})
    }

    render() {
        const {colors, paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const {level, format} = this.state;
        const colorBoxes = colors[level].map(color =>
            <ColorBox background={color[format]} name={color.name} key={color.id} id={color.id} paletteId={id}
                      showingFullPalette={true}/>)

        return (
            <div className={classes.Palette}>
                <NavBar showingAllColors
                        level={level}
                        changeLevel={this.changeLevel}
                        handleChange={this.changeFormat}/>

                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <div className={classes.footer}>
                    <PaletteFooter paletteName={paletteName} emoji={emoji}/>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(Palette)

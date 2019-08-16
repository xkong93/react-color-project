import React, {Component} from 'react';
import NavBar from './NavBar'
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter"
import {Link} from "react-router-dom"
class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        //we don't need setStete() because our shades never change

        this.state = {
            format: "hex"
        }

    }

    gatherShades(palette, colorToFilterBy) {
        console.log(palette)
        console.log(colorToFilterBy)
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy) //remember this technique
            )
        }
        return shades.slice(1)
    }

    changeFormat = (val) => {
        this.setState({format: val})
    }

    render() {
        const {format} = this.state
        const {paletteName, emoji,id} = this.props.palette
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.name} name={color.name} background={color[format]} showLink={false}/>
        ))
        return (
            <div className='SingleColorPalette Palette'>
                <NavBar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className='Palette-colors'>
                    {colorBoxes}
                    <div className='go-back ColorBox'>
                        <Link to={`/palette/${id}`} className='back-button'>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}  />
            </div>
        );
    }
}

export default SingleColorPalette;

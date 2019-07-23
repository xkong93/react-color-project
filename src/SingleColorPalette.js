import React, {Component} from 'react';
import ColorBox from "./ColorBox";

class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette,this.props.colorId)
        //we don't need setStete() because our shades never change
    }

    gatherShades(palette, colorToFilterBy) {
        console.log(palette)
        console.log(colorToFilterBy)
       let shades = [];
       let allColors = palette.colors;
       for (let key in allColors){
           shades = shades.concat(
               allColors[key].filter(color => color.id === colorToFilterBy) //remember this technique
           )
       }
       return shades.slice(1)
    }
    render() {
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.id} name={color.name} background={color.hex} showLink={false}/>
        ))
        return (
            <div className='Palette'>
                <h1>Single Color Paletee</h1>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
            </div>
        );
    }
}

export default SingleColorPalette;

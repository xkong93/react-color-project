import React, {Component} from 'react'
import ColorBox from './ColorBox'
import NavBar from './NavBar'
import './Palette.css'
import PaletteFooter from "./PaletteFooter"

export default class Palette extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format:"hex"
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
        const {colors,paletteName,emoji,id} = this.props.palette;
        const {level,format} = this.state;
        const colorBoxes = colors[level].map(color =>
            <ColorBox background={color[format]} name={color.name} key={color.id} id={color.id} paletteId={id}
                      showingFullPalette={true}/>)

        return (
            <div className='Palette'>
                <NavBar showingAllColors
                        level={level}
                        changeLevel={this.changeLevel}
                        handleChange={this.changeFormat}/>

                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <div className='Palette-footer'>
                        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
                </div>

            </div>
        )
    }
}

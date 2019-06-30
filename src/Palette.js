import React, {Component} from 'react'
import ColorBox from './ColorBox'
import  './Palette.css'

export default class Palette extends Component {
    render() {
        const colorBoxes = this.props.palette.colors.map(color =>
            <ColorBox background={color.color} name={color.name}/>)


        console.log(colorBoxes)
        return (
            <div className='Palette'>

                <div className='Palette-colors'>
                    {colorBoxes}
                </div>

            </div>
        )
    }
}

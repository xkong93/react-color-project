import React, {Component} from 'react';
import {Link} from "react-router-dom";

class PaletteList extends Component {
    render() {
        const {palettes} = this.props;

        return (
            <div>
                <h1>react colors</h1>
                {palettes.map(palette =>
                    <Link to={`/palette/${palette.id}`}><h1>{palette.paletteName}</h1></Link>)}
            </div>
        );
    }
}

export default PaletteList;

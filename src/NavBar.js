import React, {Component} from 'react';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

class NavBar extends Component {
    render() {
        const {level, changeLevel} = this.props;
        return (
            <header className="NavBar">
                <div className="logo">
                    <a href='#'reactcolorpicker></a>

                </div>
                <div className="slider">
                    <Slider defaultValue={level} min={100} max={900}
                            step={100}
                            onAfterChange={changeLevel}/>
                </div>
            </header>
        );
    }
}

export default NavBar;

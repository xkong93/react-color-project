import React, {Component} from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from "react-router-dom"
import {withStyles} from "@material-ui/styles"
import styles from './styles/ColorBoxStyles'


class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {copied: false};
        this.changeCopyState = this.changeCopyState.bind(this)

    }

    changeCopyState() {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500)
        });
    }

    render() {
        const {name, background, paletteId, id, showingFullPalette, classes} = this.props;
        const {copied} = this.state;
        // const isDarkColor = chroma(background).luminance() <= 0.08 //trick less or equal to 0.05
        // const isLightColor = chroma(background).luminance() >= 0.5 //trick less or equal to 0.05
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className={classes.ColorBox}>
                    <div style={{background}} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}/>
                    <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{this.props.background}</p>
                    </div>

                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette &&
                    <Link to={`/palette/${paletteId}/${id}`}
                          onClick={(e) => e.stopPropagation()}>
                        {/*//don't fire the button from parent*/}
                        <span className={classes.seeMore}>MORE</span>
                    </Link>}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);

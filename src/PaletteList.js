import React, {Component} from 'react';
import {Link} from "react-router-dom";
import MiniPalette from "./MiniPalette"
import {withStyles} from "@material-ui/styles"
import styles from "./styles/PaletteListStyles"
class PaletteList extends Component {

    goToPalette (id) {
        // console.log(id)
        console.log(this.props)
        this.props.routerProps.history.push(`/palette/${id}`)
    }
    render() {
        const {palettes, classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>react colors</h1>
                        <Link to="/palette/new">Create New</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette =>
                            <MiniPalette key={palette.id} palette={palette} handleClick={()=> this.goToPalette(palette.id)}/>)}
                                {/*//handleClick={this.goToPalette}*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);

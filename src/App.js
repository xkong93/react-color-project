import React, {Component} from 'react';
import Palette from './Palette'
import {Route, Switch} from 'react-router-dom'
import seedColor from './seedColors'
import {generatePalette} from './colorHelpers'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from "./NewPaletteForm";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            palettes:seedColor
        }
    }
    findPalette = (id)=>{
        return this.state.palettes.find((palette) => palette.id === id)
    }
    savePalette =(newPalette) => {
        this.setState({palettes:[
                ...this.state.palettes, newPalette
            ]})
    }

    render() {
        return (
            <Switch>
                <Route exact path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps}/>}/>

                <Route exact path="/" render={(routerProps) =>
                    <PaletteList palettes={this.state.palettes} routerProps={routerProps}/>}/>
                <Route exact path="/palette/:id"
                       render={routerProps => (
                           <Palette
                               palette={generatePalette(
                                   this.findPalette(routerProps.match.params.id))}
                           />
                       )}//key pointss
                />
                {/*<Route path="/palette/:paletteId/:colorId" render={() => <SingleColorPalette/>}/>*/}
                <Route path="/palette/:paletteId/:colorId" render={(routerProps) =>
                    <SingleColorPalette
                        colorId={routerProps.match.params.colorId}
                        palette={generatePalette(
                            this.findPalette(routerProps.match.params.paletteId))}/>}
                />

            </Switch>
        );
    }

}


export default App;

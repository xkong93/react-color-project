import React, {Component} from 'react';
import Palette from './Palette'
import {Route, Switch} from 'react-router-dom'
import seedColor from './seedColors'
import {generatePalette} from './colorHelpers'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from "./NewPaletteForm";

class App extends Component {

    findPalette(id) {
        return seedColor.find((palette) => palette.id === id)
    }

    render() {
        return (
            <Switch>
                <Route exact path="/palette/new" render={() => <NewPaletteForm/>}/>

                <Route exact path="/" render={(routerProps) =>
                    <PaletteList palettes={seedColor} routerProps={routerProps}/>}/>
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

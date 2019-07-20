import React, {Component} from 'react';
import Palette from './Palette'
import {Route, Switch} from 'react-router-dom'
import seedColor from './seedColors'
import {generatePalette} from './colorHelpers'

class App extends Component {

    findPalette(id) {
        return seedColor.find((palette) => palette.id === id)
    }

    render() {
        return (

            <Switch>
                <Route exact path="/" render={() => <h1> Palette list goes here</h1>}/>
                <Route exact path="/palette/:id"
                       render={routerProps => (
                           <Palette palette={generatePalette(
                               this.findPalette(routerProps.match.params.id))}
                           />
                       )}//key point
                />

            </Switch>
        );
    }

}


export default App;

import React from 'react';
import Palette from './Palette'
import {Route, Switch} from 'react-router-dom'
import seedColor from './seedColors'
import {generatePalette} from './colorHelpers'

function App() {
    return (
        <Switch>
            <Route exact path="/" render={() => <h1> Palette list goes here</h1>}/>
            <Route exact path="/palette/:id" render={() => <h1>individual route</h1>}/>
            {/*<div>*/}
            {/*    <Palette palette={generatePalette(seedColor[3])}/>*/}
            {/*</div>*/}
        </Switch>
    );
}

export default App;

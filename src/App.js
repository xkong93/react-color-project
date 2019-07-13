import React from 'react';
import Palette from './Palette'
import seedColor from './seedColors'
import {generatePalette} from './colorHelpers'

function App() {
    return (
        <div>
            <Palette palette={generatePalette(seedColor[3])}/>
        </div>
    );
}

export default App;

import React from 'react';
import Palette from './Palette'
import seedColor from './seedColors'

function App() {
  return (
    <div>
      <Palette palette={seedColor[5]}/>
    </div>
  );
}

export default App;

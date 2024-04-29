import './App.css';
import React, { useState, useMemo } from 'react';
import GridExample from './components/GridExample'
import Greeting from './components/Greeting' 
import Widget from './components/Widget'
function App() {
  const text = 'hello world, my first props practice';


  const [data, setData] = useState(null);




  return (
    <div className="App">
      <Widget data={data} setData={setData}> 
        <GridExample data={data} />
      </Widget>
      <Greeting text={text}/>
    </div>
  );
}

export default App;

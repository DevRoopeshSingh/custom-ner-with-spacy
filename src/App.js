import React, { useState, useEffect } from 'react';
import './App.css'
import MainPage from './component/MainPage';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      console.log('Logging time',data.time)
      setCurrentTime(data.time);
    });
  }, []);

  return (
    // <React.Fragment>
    //   <MainPage />
    // </React.Fragment>
    // <MainPage />
    <div className="App">
      {/* <header className="App-header">

        ... no changes in this part ...

        <p>The current time is {currentTime}.</p>
      </header> */}
      <MainPage /> 
    </div>
  );
}

export default App;
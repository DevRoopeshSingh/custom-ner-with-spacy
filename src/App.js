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

    <div className="App">
      <MainPage /> 
    </div>
  );
}

export default App;
import React from 'react';
import logo from './logo.svg';
import './App.css';

import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className="App">
        <NavigationBar/>
        <p>
            Welcome to Raising the Bar
        </p>
    </div>
  );
}

export default App;

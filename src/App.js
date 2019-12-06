import React from 'react';
import './App.css';
import store from './res/Store1.png';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="App-Title"> Autonomous Store System
          <p className="App-Subtitle"> [N-Team] 임환규(201411235), 문승훈(200000000) </p>
        </p>
      </header>
      <body>
        <p className="Viewer">
          <p className = "Container">
            <table className="Dividor">
              <tr>
                <td><img src={store} /></td>
                <td className="Board">Test</td>
              </tr>
            </table>
          </p>
        </p>
      </body>
    </div>
  );
}

export default App;

import React from 'react';
import Board from './components/Board';
import ExplanationPanel from './components/ExplanationPanel';
import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>Tetris</h1>
      <main className="main">
        <ExplanationPanel />
        <Board />
      </main>
    </div>
  );
}

export default App;

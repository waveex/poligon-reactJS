import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
class Prostokat {
  constructor(high, width) {
    this.high = high;
    this.width = width;
  }
  get pole() {
    return this.liczPole()
  }
  liczPole() {
    return this.high * this.width;
  }

}
const kwadrat = new Prostokat(10, 300 )
console.log(kwadrat.pole);


function Square(props) {
  return  (
    <button className=  "square" onClick= {props.onClick}>
      {props.value}
    </button>

  );
}
function calculateWinner(squeres) {
  const lines = [
    [0, 1,  2],
    [3, 4,  5],
    [6, 7,  8],
    [0, 3,  6],
    [1, 4,  7],
    [2, 5,  8],
    [0, 4,  8],
    [2, 4,  6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const  [a, b,  c] = lines[i];
    if (squeres[a] && squeres[a] === squeres[b] &&  squeres[a]  === squeres[c]) {
      return squeres[a];
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state  = {
      squeres:  Array(9).fill(null),
      xIsNext: true,
    };
  }
  handleClick(i) {
    const squeres = this.state.squeres.slice();
    if(calculateWinner(squeres) ||  (squeres[i])){
      return;
    }
    squeres[i] = this.state.xIsNext  ?  'X'  : "O";
    this.setState({
      squeres: squeres,
      xIsNext:  !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return(
     <Square
    value={this.state.squeres[i]}
    onClick={()  =>  this.handleClick(i)}
    />);
  }

  render() {
    const winner = calculateWinner(this.state.squeres);
    let status =  " ";
    if(winner){
     status = 'wygrywa ' + winner;
     alert('wygrywa ' + winner);
    }
    else {
    status = "nastepny gracz  " + (this.state.xIsNext? 'X' : 'O');
    }

    return (
      <div>
        <h1 className="title">TIC TAC TOE</h1>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


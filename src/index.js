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
const kwadrat = new Prostokat(10, 300)
console.log(kwadrat.pole);





class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="main">
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = this.state.history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'przejdz do ruchu #' + move : 'Początek gry';

      return (
        <li clasName="moves-button" key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );

    });

    let status = " ";
    if (winner) {
      status = 'wygrywa ' + winner;
      alert('wygrywa ' + winner);
    }
    else {
      status = "nastepny gracz  " + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <h1 className="game-title">TIC TAC TOE</h1>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="counter">
          <h2>Counter</h2>
          <p>State - stores and mutate components</p><Counter /></div>
        <div className="input"><Inputer /></div>
      </div>
    );
  }

}

class Inputer extends React.Component {
  constructor() {
    super();
    this.state = { firstName: '', lastName: '', };
  };
  handleInputChange = (e) =>
  this.setState
    (
      {
        [
          e.target.name
        ]
          :
          [
            e.target.value
          ]
      }
    )

    render()
    {
      return (
        <div>



  <label>Imie </label><br />
          <input  value={this.state.firstName} name="firstName"onInput={this.handleInputChange}></input> <br />
          <label>nazwsiko</label> <br />
          <input value={this.state.lastName} name="lastName" onInput={this.handleInputChange}></input> <br/>
          <output> Imię i nazwisko: {this.state.firstName} {this.state.lastName}</output>

          </div>

      )
    }
}


class Counter extends React.Component {
  constructor() {
    super();
    this.state = { counter: 0, sum: 0, doubleClick: 0 };


  }
  double() {
    this.setState({
      doubleClick: this.state.doubleClick + 1

    })
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1,
      sum: this.state.sum + 1,
      dbclicks: this.state.dbclicks + 1
    })
  }
  decrement() {
    this.setState({
      counter: this.state.counter - 1,
      sum: this.state.sum + 1,
      dbclicks: this.state.dbclicks + 1
    })

  }

  render() {
    return (
      <div>
        <button onClick={this.increment.bind(this)} >  + </button>
        <output>{this.state.counter}</output>
        <button onClick={this.decrement.bind(this)} >  - </button>
        <h2> suma kliknięć</h2>
        <output>{this.state.sum}</output>
        <h2>Podwojne kliknięcia</h2>
        <output>{this.state.doubleClick}</output>
      </div>

    );
  }
}


// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>

  );
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


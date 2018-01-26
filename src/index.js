import React from 'react';
import ReactDOM from 'react-dom';
// (React/Redux).2 and (React/Redux).3 tell us to import these functions
import { Provider, connect } from 'react-redux'
import { createStore, bindActionCreators } from 'redux'
// (React/Redux).3 importing actions
import * as actions from './actions'
// (React/Redux).4 importing reducers
import { t3reducer, t3initial } from './reducers'
// This existed beforehand
import './index.css';

function Square(props) {
  return(
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
  );
}

class Board extends React.Component {
    renderSquare(i) {
      const squares = this.props.squares;
      return <Square value={squares[i]} onClick={() => this.props.actions.play(i)} />;
    }
    render() {
      return (
        <div>
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

Board = connect((storeState) => { return {}; }, (dispatch) => { return {actions: bindActionCreators({play: actions.play}, dispatch)}})(Board);

class Game extends React.Component {
  render() {
    const { winner, history, currentHistoryStep } = this.props.gameStatus;
    const moves = history.map((step, move) => {
      const desc = move ? 'Movimiento #' + move : 'Inicio del juego';
      return (
          <li key={move}>
              <a href="#" onClick={() => this.props.actions.historyJump(move)}>{desc}</a>
          </li>
      );
    });

    let status;
    if (winner) {
      status = 'El ganador es: ' + winner;
    } else {
      status = 'Proximo Jugador: ' + (history[currentHistoryStep].xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="game-board">
          <Board
            squares={history[currentHistoryStep].squares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

Game = connect((storeState) => { return {gameStatus: storeState}; }, (dispatch) => {return {actions: bindActionCreators({historyJump: actions.historyJump}, dispatch)}})(Game);

// ========================================

let store = createStore(t3reducer, t3initial);

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root')
);

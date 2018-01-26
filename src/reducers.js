import * as consts from './consts'

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

function play(state, position) {
    let { history, winner, currentHistoryStep } = state;
    if (winner) {
        return state;
    }
    let { squares, xIsNext } = history[currentHistoryStep];
    if (squares[position]) {
        return state;
    }
    // Moving one step into the future.
    currentHistoryStep++;
    // Truncating the history to the current step, including it
    history = history.slice(0, currentHistoryStep);
    // Playing
    squares = squares.slice();
    squares[position] = xIsNext ? 'X' : 'O';
    // Pushing the new history
    history.push({
        squares: squares,
        xIsNext: !xIsNext
    });
    // returning the movement to the next history step
    return timeTravel({ history, currentHistoryStep }, currentHistoryStep);
}

function timeTravel(state, moment)  {
    return {
        ...state,
        currentHistoryStep: moment,
        winner: calculateWinner(state.history[moment].squares)
    }
}

export function t3reducer(state, action) {
    switch (action.type)
    {
        case consts.PLAY:
            return play(state, action.square);
        case consts.HISTORY_JUMP:
            return timeTravel(state, action.moment);
        default:
            return state;
    }
}

export let t3initial = {
    winner: null,
    history: [{
        squares: new Array(9).fill(null),
        xIsNext: true,
    }],
    currentHistoryStep: 0
};
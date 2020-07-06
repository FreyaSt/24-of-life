let active = true;
let board_state = [];
const BOARD_SIZE = 24;
const FRAME_RATE = 2;
const containerId = 'gameCon';
const editMessage = 'Paused - Press an arrow key to continue.';
const playMessage = 'Running - Press an arrow key to pause.';
const startMessage = "Press an arrow key when you're ready to begin";
const deadColor = 'GRAY';
const liveColor = 'INDIGO';


// Initialize board

function initBoard() {
    let newBoard = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
        let board_row = {};
        for (let y = 0; y < BOARD_SIZE; y++) {
            if (board_row[y] != deadColor) {
                board_row[y] = deadColor;
            }
            newBoard[x] = board_row;
        }
    }
    return newBoard;
}

function create(game) {
    board_state = initBoard();
    game.setText(startMessage);
}



function populateBoard(board) {
    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            game.setDot(x, y, board[x][y]);
        }
    }
}

function parseBoard(board) {
    let newBoard = new Array(BOARD_SIZE);
    for (let i in board) {
        newBoard[i] = new Array(BOARD_SIZE);
    }

    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            let board_val = board[x][y];
            let count = n_count(x, y);
            if (board_val == liveColor && count < 2) {
                newBoard[x][y] = deadColor;
            } else if (board_val == liveColor && count > 3) {
                newBoard[x][y] = deadColor;
            } else if (board_val == liveColor) {
                newBoard[x][y] = liveColor;
            } else if (board_val == deadColor && count === 3) {
                newBoard[x][y] = liveColor;
            } else {
                newBoard[x][y] = deadColor;
            }
        }
    }

    return newBoard;
}


function update(game) {

    populateBoard(board_state);
    if (!active) {
        board_state = parseBoard(board_state);
    }
}

function n_count(x, y) {
    let count = 0
    try {
        if (game.getDot(x + 1, y) == liveColor) {
            count++;
        };
        if (game.getDot(x + 1, y + 1) == liveColor) {
            count++;
        };
        if (game.getDot(x - 1, y - 1) == liveColor) {
            count++;
        };
        if (game.getDot(x + 1, y - 1) == liveColor) {
            count++;
        };
        if (game.getDot(x - 1, y + 1) == liveColor) {
            count++;
        };

        if (game.getDot(x - 1, y) == liveColor) {
            count++;
        };

        if (game.getDot(x, y + 1) == liveColor) {
            count++;
        };

        if (game.getDot(x, y - 1) == liveColor) {
            count++;
        };
    } catch (error) {
        return 0;
    }
    return count;

}

function onKeyPress(direction) {
    active ? (active = false) : (active = true);
    game.setText(active ? editMessage : playMessage);
    board_state = parseBoard(board_state);
    return

}

function onDotClicked(x, y) {
    if (active) {
        if (game.getDot(x, y) == deadColor) {
            board_state[x][y] = liveColor;

        } else {
            board_state[x][y] = deadColor;

        }
    }


}






const config = {
    create: create,
    update: update,
    onKeyPress: onKeyPress,
    onDotClicked: onDotClicked,
    containerId: containerId,
    frameRate: FRAME_RATE,
}

let game = new Game(config);
game.run();

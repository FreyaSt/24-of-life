let editMode = true; // Global stop/go state
let boardState = []; // Underlying board state

const BOARD_SIZE = 24; // This can be monkey patched in the 24a2 engine
const FRAME_RATE = 2;
const containerId = 'gameCon';
const editMessage = 'Paused - Press an arrow key to continue.';
const playMessage = 'Running - Press an arrow key to pause.';
const startMessage = "Press an arrow key when you're ready to begin";
const deadColor = 'GRAY'; //Color enumeration available at https://24a2.routley.io/reference/enums/color/
const liveColor = 'INDIGO';


// Returns an entirely dead board
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

//Get things started with a clear message and board
function create(game) {
    boardState = initBoard();
    game.setText(startMessage);
}


//Renders game state onto board
function renderBoard(board) {
    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            game.setDot(x, y, board[x][y]);
        }
    }
}

//Central game logic. This returns a new array for the board state according to Conway's rules
function parseBoard(board) {
    // Initialize an empty array to match coordinate notation with Array access
    let newBoard = new Array(BOARD_SIZE);
    for (let i in board) {
        newBoard[i] = new Array(BOARD_SIZE);
    }

    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {

            let board_val = board[x][y];
            let count = n_count(x, y);

            //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            if (board_val == liveColor && count < 2) {
                newBoard[x][y] = deadColor;

                //Any live cell with more than three live neighbours dies, as if by overpopulation
            } else if (board_val == liveColor && count > 3) {
                newBoard[x][y] = deadColor;

                //By exclusion, any live cell with 2 or 3 live neighbors survives to the next generation
            } else if (board_val == liveColor) {
                newBoard[x][y] = liveColor;

                //Any dead cell with exactly three neighbors becomes a live cell, as if by reproduction
            } else if (board_val == deadColor && count === 3) {
                newBoard[x][y] = liveColor;

                // Everything else dies
            } else {
                newBoard[x][y] = deadColor;
            }
        }
    }

    return newBoard;
}


function update(game) {
    //Render every frame
    renderBoard(boardState);

    //Don't run the simulation if the player is editting
    if (!editMode) {
        boardState = parseBoard(boardState);
    }
}

function n_count(x, y) {
    let count = 0;

    //Invalid access returns 0
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
        return 0; //No neighbors for our boundary cells
    }
    return count;

}


//Toggles editMode and message
function onKeyPress(direction) {
    editMode ? (editMode = false) : (editMode = true);
    game.setText(editMode ? editMessage : playMessage);
}


//Toggles dot on click if currently in editMode
function onDotClicked(x, y) {
    if (editMode) {
        if (game.getDot(x, y) == deadColor) {
            boardState[x][y] = liveColor;

        } else {
            boardState[x][y] = deadColor;

        }
    }
    //Re-render the board on click. This prevents the player from waiting for the next frame for feedback.
    renderBoard(boardState);

}

//Bind functions to game object
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

let active = true;
let board_state = [];
const BOARD_SIZE = 24;


for (let x = 0; x < BOARD_SIZE; x++) {
    let board_row = {}
    for (let y = 0; y < BOARD_SIZE; y++) {
        if (board_row[y] != 'GRAY') {
            board_row[y] = 'GRAY';
        }
        board_state[x] = board_row
    }
}

function create(game) {
    game.setText('Edit Mode')
}



function populateBoard(board) {
    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            game.setDot(x, y, board[x][y])
        }
    }
}

function parseBoard(board) {
    let newBoard = new Array(BOARD_SIZE)
    for (let i in board) {
        newBoard[i] = new Array(BOARD_SIZE)
    }

    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            if (board[x][y] == 'BLACK' && n_count(x, y) < 2) {
                console.log(`Killing dot at ${x},${y}`)
                newBoard[x][y] = 'GRAY'
            } else if (board[x][y] == 'BLACK' && n_count(x,y) > 3) {
                newBoard[x][y] = 'GRAY'
            } else if (board[x][y] == 'GRAY' && n_count(x,y) === 3) {
                newBoard[x][y] = 'BLACK'
            } else {
            newBoard[x][y] = board[x][y]
            }
        }
    }

    return newBoard
}


function update(game) {
    
    if (!active) {
        board_state = parseBoard(board_state);
        console.log(board_state)
    }
    populateBoard(board_state)
}

function n_count(x, y) {
    let count = 0
    try {
        if (game.getDot(x + 1, y) == 'BLACK') {
            count++;
        };
        if (game.getDot(x + 1, y + 1) == 'BLACK') {
            count++;
        };
        if (game.getDot(x - 1, y - 1) == 'BLACK') {
            count++;
        };
        if (game.getDot(x + 1, y - 1) == 'BLACK') {
            count++;
        };
        if (game.getDot(x - 1, y + 1) == 'BLACK') {
            count++;
        };

        if (game.getDot(x - 1, y) == 'BLACK') {
            count++;
        };

        if (game.getDot(x, y + 1) == 'BLACK') {
            count++;
        };

        if (game.getDot(x, y - 1) == 'BLACK') {
            count++;
        };
    } catch (error) {
        return 0;
    }
    return count

}

function onKeyPress(direction) {
    active ? (active = false) : (active = true);
    game.setText(active ? "Edit Mode" : "Sim Mode");
    // board_state = parseBoard(board_state)
    return

}

function onDotClicked(x, y) {
    if (active) {
        if (game.getDot(x, y) == 'GRAY') {
            board_state[x][y] = 'BLACK'

        } else {
            board_state[x][y] = 'GRAY'

        }
    }


}






const config = {
    create: create,
    update: update,
    onKeyPress: onKeyPress,
    onDotClicked: onDotClicked,
    containerId: 'gameCon',
    frameRate: 1,
}

let game = new Game(config)
game.run()

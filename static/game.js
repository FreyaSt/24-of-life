let active = true;
let board_state = {};

for (let x = 0; x < 24; x++) {
    let board_row = {}
    for (let y = 0; y < 24; y++) {
        if (board_row[y] != 'GRAY') {
            board_row[y] = 'GRAY';
        }
        board_state[x] = board_row
    }
}

function decreaseTimer() {
    timeRemaining--;
    if (timeRemaining == 0) {
        clearInterval(interval)
    }

}

function create(game) {
    console.log(board_state)
    game.setText('Edit Mode')
}



function populateBoard(board) {
    for (let x = 0; x < 24; x++) {
        for (let y = 0; y < 24; y++) {
            game.setDot(x, y, board[x][y])
        }
    }


}

function update(game) {
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
    populateBoard(board_state);
    return;

}

function newBoard() {
    for (let x = 0; x < 24; x++) {
        for (let y = 0; y < 24; y++) {
            let count = n_count(x, y)
            let dotColor = game.getDot(x, y)
            if (dotColor == 'BLACK' && count < 2) {
                let item = {
                    x: x,
                    y: y
                }
                items.push(item)
            }

        }
    }
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
    containerId: 'gameCon'
}

let game = new Game(config)
game.run()

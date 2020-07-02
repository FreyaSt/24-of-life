let items = [];
let timeRemaining = 45;
let interval = setInterval(decreaseTimer, 1000);
let score = 0;
let active = true

function decreaseTimer() {
    timeRemaining--;
    if (timeRemaining == 0) {
        clearInterval(interval)
    }

}

function create(game) {
    game.setText('Edit Mode')}

function update(game) {
    let item = {};
    for (let item of items) {
        game.setDot(item.x, item.y, Color.Black);
    }

    if (timeRemaining <= 0) {
        game.setText(`Game over! Final score: ${score}`);
        game.end();
    }

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
    active ? (active = false) : (active = true)
    console.log("Switched active to", (active))
    game.setText(active ? "Edit Mode" : "Sim Mode")
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
            let item = {
                x: x,
                y: y
            };
            items.push(item);
            console.log(n_count(x, y))

        } else {
            for (let i = 0; i < items.length; i++) {
                const item = items[i]
                if (item.x == x && item.y == y) {
                    items.splice(i, 1);
                    break;
                }
            }
        }
    }



    return;
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

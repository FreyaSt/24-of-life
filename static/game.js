let player = {};
let items = [];
let timeRemaining = 45;
let interval = setInterval(decreaseTimer, 1000);
let score = 0;


function decreaseTimer() {
    timeRemaining--;
    if (timeRemaining == 0) {
        clearInterval(interval)
    }

}

function create(game) {
    player = {
        x: 5,
        y: 10,
    };
    game.setDot(player.x, player.y, Color.Black);
}

function update(game) {

    if (Math.random() < .05) {
        item = {
            x: Math.floor(Math.random() * 24),
            y: Math.floor(Math.random() * 24),
        };
        if (item.x !== player.x || item.y !== player.y) {
            items.push(item);
        }
    }
    for (item of items) {
        game.setDot(item.x, item.y, Color.Green);
    }
    game.setDot(player.x, player.y, Color.Black);
    game.setText(`Time left: ${timeRemaining}s. Score: ${score}`);

    if (timeRemaining <= 0) {
        game.setText(`Game over! Final score: ${score}`);
        game.end();
    }

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.x == player.x && item.y == player.y) {
            score++;
            items.splice(i, 1);
            break;
        }
    }

}

function onKeyPress(direction) {
    if (direction == Direction.Up && player.y > 0) {
        player.y--;
    }
    if (direction == Direction.Down && player.y < 23) {
        player.y++;
    }
    if (direction == Direction.Left && player.x > 0) {
        player.x--;
    }
    if (direction == Direction.Right && player.x < 23) {
        player.x++;
    }



}

const config = {
    create: create,
    update: update,
    onKeyPress: onKeyPress,
}

let game = new Game(config)
game.run()

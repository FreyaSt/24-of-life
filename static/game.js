let player = {}



function create(game) {
    player = {
        x: 5,
        y: 10,
    };
    game.setDot(player.x, player.y, Color.Black)
}

function update(game) {
    game.setDot(player.x, player.y, Color.Black)
}

function onKeyPress(direction) {
    if (direction == Direction.Up && player.y > 0) {
        player.y--
    }
    if (direction == Direction.Down && player.y < 23) {
        player.y++
    }
    if (direction == Direction.Left && player.x > 0) {
        player.x--
    }
    if (direction == Direction.Right && player.x < 23) {
        player.x++
    }



}

const config = {
    create: create,
    update: update,
    onKeyPress: onKeyPress,
}

let game = new Game(config)
game.run()

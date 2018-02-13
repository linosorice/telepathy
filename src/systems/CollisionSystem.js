export default class CollisionSystem {
  constructor (game, players, walls) {
    this.game = game
    this.players = players
    this.walls = walls
  }

  update () {
    this.players.forEach(p =>
      this.walls.forEach(w =>
        this.game.physics.arcade.collide(w.sprite, p.sprite, function () { })
      )
    )
  }
}

import Phaser from 'phaser'

export default class TransmissionSystem {
  constructor (game, players) {
    this.game = game
    this.players = players
  }

  update () {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.players.forEach(player => {
      })
    }
  }
}

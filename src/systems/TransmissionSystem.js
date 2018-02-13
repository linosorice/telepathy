import Phaser from 'phaser'

export default class TransmissionSystem {
  constructor (game, players) {
    this.game = game
    this.players = players
  }

  update () {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      // TODO: CREATE A PICTURE IN PICTURE FRAME FOR OTHERS PLAYERS
    }
  }
}

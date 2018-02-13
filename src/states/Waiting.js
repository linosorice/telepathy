import Phaser from 'phaser'
import socket from '../socket'

export default class extends Phaser.State {
  init (i) {
    this.i = i
  }

  create () {
    let title = this.game.add.sprite(0, 0, 'loading')
    title.anchor.setTo(0.5, 0.5)
    title.position.x = this.game.world.centerX
    title.position.y = this.game.world.centerY

    title.animations.add('load', [0, 1, 2])
    title.animations.play('load', 5, true)

    console.log('waiting', this.i)
    /*
    setTimeout(() => {
      this.state.start('Game', true, false, this.i)
    }, 3000)
    */
    if (this.i === 2) {
      this.state.start('Game', true, false, this.i)
    } else {
      socket.on('game_ready', () => {
        console.log('game is ready')
        this.state.start('Game', true, false, this.i)
      })
    }
  }
}

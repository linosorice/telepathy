import Phaser from 'phaser'
import socket from '../socket'

export default class extends Phaser.State {
  create () {
    let title = this.game.add.sprite(0, 0, 'title')
    title.anchor.setTo(0.5, 0.5)
    title.position.x = this.game.world.centerX
    title.position.y = this.game.world.centerY - 200

    let credits = this.game.add.sprite(0, 0, 'credits')
    credits.anchor.setTo(0.5, 0.5)
    credits.position.x = this.game.world.centerX
    credits.position.y = this.game.world.centerY + 200

    let obj = this
    let buttonPlay = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button_play', function () {
      socket.emit('join_room')
      buttonPlay.frame = 1
      socket.on('accepted', i => {
        buttonPlay.frame = 0
        // var serverIP = prompt('Please enter IP of the server', '')
        // if (serverIP != null) {
        obj.state.start('Waiting', true, false, i)
        // }
      }, 200)
    })

    buttonPlay.anchor.set(0.5, 0.5)
  }
}

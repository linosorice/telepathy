import Phaser from 'phaser'

export default class extends Phaser.State {
  create () {
    let title = this.game.add.sprite(0, 0, 'loading')
    title.anchor.setTo(0.5, 0.5)
    title.position.x = this.game.world.centerX
    title.position.y = this.game.world.centerY

    title.animations.add('load', [0, 1, 2])
    title.animations.play('load', 5, true)

    setTimeout(() => {
      this.state.start('Game')
    }, 3000)
  }
}

import Phaser from 'phaser'
import { CELL_SCALE, ANIMATIONS_SPEED } from '../constants'

const SPEED = 5

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.shadow = this.game.add.sprite(x, y + 8, 'shadow')
    this.shadow.anchor.setTo(0.5)
    this.scale.setTo(CELL_SCALE, CELL_SCALE)
    this.game.physics.arcade.enable(this)
    this.animations.add('walk', [4, 5, 6, 7])
    this.animations.add('idle', [0, 1, 2, 3])
  }

  update () {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.x -= SPEED
      this.shadow.x -= SPEED
      this.animations.play('walk', ANIMATIONS_SPEED, true)
      this.scale.setTo(-CELL_SCALE, CELL_SCALE)
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.x += SPEED
      this.shadow.x += SPEED
      this.animations.play('walk', ANIMATIONS_SPEED, true)
      this.scale.setTo(CELL_SCALE, CELL_SCALE)
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.y -= SPEED
      this.shadow.y -= SPEED
      this.animations.play('walk', ANIMATIONS_SPEED, true)
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.y += SPEED
      this.shadow.y += SPEED
      this.animations.play('walk', ANIMATIONS_SPEED, true)
    } else {
      this.animations.play('idle', ANIMATIONS_SPEED, true)
    }
  }
}

import Phaser from 'phaser'
import { CELL_SCALE, ANIMATIONS_SPEED } from '../constants'

const SPEED = 500

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.scale.setTo(CELL_SCALE, CELL_SCALE)
    this.game.physics.arcade.enable(this)
    this.animations.add('walk', [4, 5, 6, 7])
    this.animations.add('idle', [0, 1, 2, 3])
  }

  update () {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.body.velocity.x = -SPEED
      this.animations.play('walk', ANIMATIONS_SPEED, true)
      this.scale.setTo(-CELL_SCALE, CELL_SCALE)
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.body.velocity.x = SPEED
      this.animations.play('walk', ANIMATIONS_SPEED, true)
      this.scale.setTo(CELL_SCALE, CELL_SCALE)
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.body.velocity.y = -SPEED
      this.animations.play('walk', ANIMATIONS_SPEED, true)
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.body.velocity.y = SPEED
      this.animations.play('walk', ANIMATIONS_SPEED, true)
    } else {
      this.body.velocity.setTo(0)
      this.animations.play('idle', ANIMATIONS_SPEED, true)
    }

    this.shadow.x = this.body.position.x + 16
    this.shadow.y = this.body.position.y + 24
  }

  addShadow () {
    this.shadow = this.game.add.sprite(this.x, this.y + 8, 'shadow')
    this.shadow.anchor.setTo(0.5)
  }
}

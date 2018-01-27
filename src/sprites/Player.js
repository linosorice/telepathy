import Phaser from 'phaser'
import { CELL_SCALE, ANIMATIONS_SPEED } from '../constants'

const SPEED = 500

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, networked }) {
    super(game, x, y, asset)
    this.networked = networked
    this.anchor.setTo(0.5)
    this.scale.setTo(CELL_SCALE, CELL_SCALE)
    this.game.physics.arcade.enable(this)
    this.animations.add('walk', [4, 5, 6, 7])
    this.animations.add('idle', [0, 1, 2, 3])
    this.steps = this.game.add.audio('walk')
  }

  update () {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.transmissionOn = true
    }

    /* Movement */
    if (!this.networked && !this.transmissionOn) {
      let v = new Phaser.Point()
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        v.x = -1
        this.animations.play('walk', ANIMATIONS_SPEED, true)
        this.scale.setTo(-CELL_SCALE, CELL_SCALE)
      } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        v.x = 1
        this.animations.play('walk', ANIMATIONS_SPEED, true)
        this.scale.setTo(CELL_SCALE, CELL_SCALE)
      }

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        v.y = -1
        this.animations.play('walk', ANIMATIONS_SPEED, true)
      } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        v.y = 1
        this.animations.play('walk', ANIMATIONS_SPEED, true)
      }

      v.normalize()
      v.multiply(SPEED, SPEED)
      this.body.velocity.x = v.x
      this.body.velocity.y = v.y

      if (v.getMagnitude() === 0) {
        this.animations.play('idle', ANIMATIONS_SPEED, true)
        this.steps.stop()
      } else {
        if (!this.steps.isPlaying) {
          //this.steps.loop = true
          this.steps.volume = 1
          this.steps.play()
        }
      }
    }

    this.shadow.x = this.body.position.x + 16
    this.shadow.y = this.body.position.y + 24
  }

  addShadow () {
    this.shadow = this.game.add.sprite(this.x, this.y + 8, 'shadow')
    this.shadow.anchor.setTo(0.5)
  }

  setTransmission (toggle) {
    this.transmissionOn = toggle
  }
}

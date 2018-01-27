import Phaser from 'phaser'
import { CELL_SCALE, ANIMATIONS_SPEED } from '../constants'

const ATTACK_DISTANCE = 150
const ATTACK_SPEED = 300
const ATTACK_TIME = 400

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, player }) {
    super(game, x, y, asset)
    this.player = player
    this.anchor.setTo(0.5)
    this.shadow = this.game.add.sprite(x, y + 8, 'shadow')
    this.shadow.anchor.setTo(0.5)
    this.scale.setTo(CELL_SCALE, CELL_SCALE)
    this.onAttack = false
    this.game.physics.arcade.enable(this)
    this.animations.add('walk', [4, 5, 6, 7])
    this.animations.add('idle', [0, 1, 2, 3])
  }

  update () {
    this.shadow.x = this.x
    this.shadow.y = this.y + 8

    if (this.game.physics.arcade.distanceBetween(this, this.player) < ATTACK_DISTANCE && !this.onAttack) { // ATTACK
      this.game.physics.arcade.moveToObject(this, this.player, ATTACK_SPEED)
      this.onAttack = true
      setTimeout(() => {
        this.onAttack = false
        this.body.acceleration.x = 0
        this.body.acceleration.y = 0
        this.body.velocity.x = 0
        this.body.velocity.y = 0
        this.x = Math.random() * this.game.height
        this.y = Math.random() * this.game.height
      }, ATTACK_TIME)
    }

    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      this.animations.play('idle', ANIMATIONS_SPEED, true)
    } else {
      if (this.body.velocity.x > 0) {
        this.scale.setTo(CELL_SCALE, CELL_SCALE)
      } else {
        this.scale.setTo(-CELL_SCALE, CELL_SCALE)
      }
      this.animations.play('walk', ANIMATIONS_SPEED, true)
    }
  }
}

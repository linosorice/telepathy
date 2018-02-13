import Phaser from 'phaser'
import { ANIMATIONS_SPEED } from '../constants'

const SPEED = 500

export default class MovementSystem {
  constructor (game, players) {
    this.players = players
    this.game = game
    this.players.forEach(p => {
      p.sprite.animations.add('walk', [4, 5, 6, 7])
      p.sprite.animations.add('idle', [0, 1, 2, 3])
    })
  }

  update () {
    this.players.forEach(player => {
      if (!player.networked) {
        this.keyboardMovement(player)
      }
    })
  }

  keyboardMovement (player) {
    let v = new Phaser.Point()
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      v.x = -1
      player.sprite.animations.play('walk', ANIMATIONS_SPEED, true)
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      v.x = 1
      player.sprite.animations.play('walk', ANIMATIONS_SPEED, true)
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      v.y = -1
      player.sprite.animations.play('walk', ANIMATIONS_SPEED, true)
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      v.y = 1
      player.sprite.animations.play('walk', ANIMATIONS_SPEED, true)
    }

    v.normalize()
    v.multiply(SPEED, SPEED)
    player.sprite.body.velocity.x = v.x
    player.sprite.body.velocity.y = v.y

    if (v.getMagnitude() === 0) {
      player.sprite.animations.play('idle', ANIMATIONS_SPEED, true)
    }

    player.shadow.x = player.sprite.body.position.x + 16
    player.shadow.y = player.sprite.body.position.y + 24
  }
}

import Phaser from 'phaser'
import { CELL_SCALE, VARIANT_TILE } from '../constants'

export default class extends Phaser.Sprite {
  constructor ({game, x, y, north, player}) {
    super(game, x, y, 'dungeon')
    this.game = game
    this.game.physics.arcade.enable(this)
    this.body.immovable = true
    this.frame = north ? 8 : Math.random() > VARIANT_TILE ? 0 : 1
    this.anchor.setTo(0.5)
    this.scale.setTo(CELL_SCALE, CELL_SCALE)
    this.players = player
  }

  update () {
    this.players.forEach(p =>
      this.game.physics.arcade.collide(this, p, function () { })
    )
  }
}

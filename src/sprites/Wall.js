import Phaser from 'phaser'
import { CELL_SCALE, VARIANT_TILE } from '../constants'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, north }) {
    super(game, x, y, 'dungeon')
    this.frame = north ? 8 : Math.random() > VARIANT_TILE ? 0 : 1
    this.anchor.setTo(0.5)
    this.scale.setTo(CELL_SCALE, CELL_SCALE)
  }

  update () {

  }
}

import Phaser from 'phaser'
import { CELL_SCALE } from '../constants'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.scale.setTo(CELL_SCALE, CELL_SCALE)
  }

  update () {

  }
}

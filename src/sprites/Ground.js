import Phaser from 'phaser'
import { CELL_SCALE, VARIANT_TILE, OBJ_PROB } from '../constants'

const pickObj = (r) => {
  if (r < OBJ_PROB) {
    return 10
  }
  if (r < 2 * OBJ_PROB) {
    return 11
  }
  if (r < 3 * OBJ_PROB) {
    return 12
  }
  if (r < 4 * OBJ_PROB) {
    return 13
  }
  if (r < 5 * OBJ_PROB) {
    return 14
  }
  return 4
}

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, north }) {
    super(game, x, y, 'dungeon')
    this.frame = north ? 9 : Math.random() > VARIANT_TILE
      ? pickObj(Math.random())
      : 5
    this.anchor.setTo(0.5)
    this.scale.setTo(CELL_SCALE, CELL_SCALE)
  }

  update () {

  }
}

import { CELL_SCALE } from '../constants'

export default class Entity {
  constructor (sprite) {
    this.sprite = sprite
    sprite.anchor.setTo(0.5)
    sprite.scale.setTo(CELL_SCALE, CELL_SCALE)
  }
}

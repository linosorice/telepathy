import Entity from './Entity'

export default class Ground extends Entity {
  constructor (sprite, frame) {
    super(sprite)
    sprite.frame = frame
  }
}

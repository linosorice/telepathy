import Entity from './Entity'

export default class Wall extends Entity {
  constructor (sprite, frame) {
    super(sprite)
    sprite.game.physics.arcade.enable(sprite)
    sprite.body.immovable = true
    sprite.frame = frame
  }
}

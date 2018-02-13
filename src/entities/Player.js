import Entity from './Entity'

export default class Player extends Entity {
  constructor (sprite, shadow, networked, onTrasmission) {
    super(sprite)
    this.shadow = shadow
    this.networked = networked
    this.onTrasmission = this.onTrasmission
    sprite.game.physics.arcade.enable(sprite)
  }
}

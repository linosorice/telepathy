import Entity from './Entity'

export default class Player extends Entity {
  constructor (sprite, shadow, networked, ligthOn) {
    super(sprite)
    this.shadow = shadow
    this.networked = networked
    this.lightOn = ligthOn
    sprite.game.physics.arcade.enable(sprite)
  }
}

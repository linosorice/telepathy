import Phaser from 'phaser'

const LIGHT_RADIUS = 256

export default class extends Phaser.Sprite {
  constructor ({ game, player }) {
    let shadowTexture = game.add.bitmapData(game.width * 2, game.height * 2)
    super(game, -game.width / 2, -game.height / 2, shadowTexture)
    this.shadowTexture = shadowTexture
    this.player = player
    this.blendMode = Phaser.blendModes.MULTIPLY
  }

  update () {
    this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)'
    this.shadowTexture.context.fillRect(0, 0, this.game.width * 2, this.game.height * 2)

      // Draw circle of light with a soft edge
    let gradient = this.shadowTexture.context.createRadialGradient(
        this.player.x + this.game.width / 2, this.player.y + this.game.height / 2, LIGHT_RADIUS * 0.15,
      this.player.x + this.game.width / 2, this.player.y + this.game.height / 2, LIGHT_RADIUS)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)')

    this.shadowTexture.context.beginPath()
    this.shadowTexture.context.fillStyle = gradient
    this.shadowTexture.context.arc(this.player.x + this.game.width / 2, this.player.y + this.game.height / 2,
          LIGHT_RADIUS, 0, Math.PI * 2)
    this.shadowTexture.context.fill()

      // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true
  }
}

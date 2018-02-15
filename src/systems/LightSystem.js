import Phaser from 'phaser'

const LIGHT_RADIUS = 180

export default class LightSystem {
  constructor (game, players) {
    this.game = game
    this.players = players
    this.shadowTexture = this.game.add.bitmapData(3000, 3000)
    players.forEach(player => {
      if (player.lightOn) {
        player.torch = this.createTorch(player.sprite.body.position.x, player.sprite.body.position.y)
      }
    })
  }

  update () {
    this.players.forEach(player => {
      if (player.lightOn) {
        this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)'
        this.shadowTexture.context.fillRect(0, 0, 3000, 3000)

        const x = player.sprite.body.position.x + this.game.width + 220
        const y = player.sprite.body.position.y + this.game.height + 420

        // Draw circle of light with a soft edge
        let gradient = this.shadowTexture.context.createRadialGradient(x, y, LIGHT_RADIUS * 0.15, x, y, LIGHT_RADIUS)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)')

        this.shadowTexture.context.beginPath()
        this.shadowTexture.context.fillStyle = gradient
        this.shadowTexture.context.arc(x, y, LIGHT_RADIUS, 0, Math.PI * 2)
        this.shadowTexture.context.fill()

        // This just tells the engine it should update the texture cache
        this.shadowTexture.dirty = true
      }
    })
  }

  createTorch (x, y) {
    const torch = this.game.add.sprite(x, y, this.shadowTexture)
    torch.anchor.setTo(0.5)
    torch.blendMode = Phaser.blendModes.MULTIPLY
    return torch
  }
}

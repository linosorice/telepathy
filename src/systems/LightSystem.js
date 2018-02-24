import Phaser from 'phaser'
import config from '../config'
import { WORLD_OFFSET_X, WORLD_OFFSET_Y } from '../constants'

const LIGHT_RADIUS = 180

export default class LightSystem {
  constructor (game, players) {
    this.game = game
    this.players = players
    this.shadowTexture = this.game.add.bitmapData(config.gameWidth, config.gameHeight)
    players.forEach(player => {
      if (player.lightOn) {
        player.torch = this.createTorch()
      }
    })
  }

  update () {
    this.players.forEach(player => {
      if (player.lightOn) {
        this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)'
        let x = config.gameWidth / 2
        let y = config.gameHeight / 2
        if (this.game.camera.atLimit.x) {
          x = player.sprite.body.position.x > x ? -WORLD_OFFSET_X : WORLD_OFFSET_X
          x += player.sprite.body.position.x
        }
        if (this.game.camera.atLimit.y) {
          y = player.sprite.body.position.y > y ? -WORLD_OFFSET_Y : WORLD_OFFSET_Y
          y += player.sprite.body.position.y
        }
        this.shadowTexture.context.fillRect(0, 0, config.gameWidth, config.gameHeight)

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

  createTorch () {
    const torch = this.game.add.sprite(0, 0, this.shadowTexture)
    torch.fixedToCamera = true
    torch.blendMode = Phaser.blendModes.MULTIPLY
    return torch
  }
}

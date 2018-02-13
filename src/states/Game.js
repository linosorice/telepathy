import Phaser from 'phaser'
import Player from '../entities/Player'
import MovementSystem from '../systems/MovementSystem'

import MapSystem from '../systems/MapSystem'
import CollisionSystem from '../systems/CollisionSystem'
import LightSystem from '../systems/LightSystem'
import TransmissionSystem from '../systems/TransmissionSystem'

export default class extends Phaser.State {
  init () {
    this.players = []
    this.walls = []
  }

  create () {
    this.mapSystem = new MapSystem(this.game)
    this.walls = this.mapSystem.init()

    const player1 = this.createPlayer(100, 300, false, false)
    const player2 = this.createPlayer(200, 300, true, false)
    const enemy = this.createEnemy(300, 300, true, false)

    this.players = [player1, player2, enemy]

    this.movementSystem = new MovementSystem(this.game, this.players)
    this.collisionSystem = new CollisionSystem(this.game, this.players, this.walls)

    this.lightSystem = new LightSystem(this.game, player1)
    this.transmissionSystem = new TransmissionSystem(this.game, this.players)

    this.game.world.setBounds(-360, -560, 1920, 1920)
    this.game.camera.follow(player1.sprite)
  }

  createPlayer (x, y, networked, lightOn) {
    const shadow = this.game.add.sprite(x, y + 8, 'shadow')
    shadow.anchor.setTo(0.5)
    const player = new Player(this.add.sprite(x, y, 'player'), shadow, networked, lightOn)
    return player
  }

  createEnemy (x, y, networked, lightOn) {
    const shadow = this.game.add.sprite(x, y + 8, 'shadow')
    shadow.anchor.setTo(0.5)
    const enemy = new Player(this.add.sprite(x, y, 'monster'), shadow, networked, lightOn)
    return enemy
  }

  update () {
    this.movementSystem.update()
    this.collisionSystem.update()
    this.lightSystem.update()
    this.transmissionSystem.update()
  }
}

/* globals __DEV__ */
import Phaser from 'phaser'
import Battlefield from './modules/Battlefield'
import Player from '../sprites/Player.js'
import Torch from '../sprites/Torch'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    /* Play heartbeat audio */
    const heartbeat = this.game.add.audio('heartbeat')
    heartbeat.loop = true
    heartbeat.volume = 1
    heartbeat.play()

    this.player1 = new Player({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'player',
      networked: false
    })

    this.player2 = new Player({
      game: this.game,
      x: 100,
      y: 0,
      asset: 'player',
      networked: true
    })

    let battlefield = new Battlefield(this.game, this.player1)
    battlefield.create()

    this.player1.addShadow()
    this.player2.addShadow()
    this.game.add.existing(this.player1)
    this.game.add.existing(this.player2)
    this.game.world.setBounds(-this.game.width / 2, -this.game.height / 2, this.game.width * 2, this.game.height * 2)
    this.game.camera.follow(this.player1)

    this.torch = new Torch({
      game: this.game,
      player: this.player1
    })
    this.game.add.existing(this.torch)

    /* Transmission on */
    const keyTransm = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    keyTransm.onDown.add(function () {
      this.player1.setTransmission(true)
      setTimeout(() => {
        this.player1.setTransmission(false)
        this.game.camera.follow(this.player1)
        this.torch.setPlayer(this.player1)
      }, 2000)
      this.game.camera.follow(this.player2)
        this.torch.setPlayer(this.player2)
    }, this)

  }

  render () {
    if (__DEV__) {
      this.game.debug.cameraInfo(this.game.camera, 32, 32)
    }
  }
}

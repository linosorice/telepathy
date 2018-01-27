/* globals __DEV__ */
import Phaser from 'phaser'
import Battlefield from './modules/Battlefield'
import Player from '../sprites/Player'
import Monster from '../sprites/Monster'
import Torch from '../sprites/Torch'

export default class extends Phaser.State {
  init (i) {
    this.i = i
  }

  preload () {}

  create () {
    /* Play heartbeat audio */
    const heartbeat = this.game.add.audio('heartbeat')
    heartbeat.loop = true
    heartbeat.volume = 1
    heartbeat.play()

    /* Add defeat and victory sounds */
    this.defeatSound = this.game.add.audio('defeat')
    this.victorySound = this.game.add.audio('victory')

    this.player1 = new Player({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'player',
      networked: this.i !== 0,
      i: 0
    })

    this.player2 = new Player({
      game: this.game,
      x: 100,
      y: 0,
      asset: 'player',
      networked: this.i !== 1,
      i: 1
    })

    this.monster = new Monster({
      game: this.game,
      x: 200,
      y: 0,
      asset: 'monster',
      networked: this.i !== 2,
      i: 2
    })

    /* Set battlefield */
    let battlefield = new Battlefield(this.game, this.player1)
    battlefield.create()

    /* Add shadows */
    this.player1.addShadow()
    this.player2.addShadow()
    this.monster.addShadow()

    /* Add entities */
    this.game.add.existing(this.player1)
    this.game.add.existing(this.player2)
    this.game.add.existing(this.monster)

    /* Set local player */
    console.log('Game', this.i)
    const localPlayer = this.i === 0 ? this.player1
      : this.i === 1 ? this.player2
         : this.monster

    /* Torch */
    this.torch = new Torch({
      game: this.game,
      player: localPlayer
    })
    this.game.add.existing(this.torch)

    /* Set world bounds and camera */
    this.game.world.setBounds(-360, -560, 1920, 1920)
    this.game.camera.follow(localPlayer)

    /* Transmission on */
    const keyTransm = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    keyTransm.onDown.add(function () {
      this.player1.setTransmission(true)
      setTimeout(() => {
        this.player1.setTransmission(false)
        this.game.camera.follow(localPlayer)
        this.torch.setPlayer(localPlayer)
      }, 2000)
      this.game.camera.follow(this.player2)
      this.torch.setPlayer(this.player2)
    }, this)
  }

  update () {
    /* Monster kills player */
    this.game.physics.arcade.overlap(this.monster, [this.player1, this.player2], function (monster, player) {
      if (!this.defeat) {
        this.defeatSound.play()
        this.defeat = true
      }
    }, null, this)

    /* Victory */
    this.game.physics.arcade.overlap(this.player1, this.player2, function (player1, player2) {
      if (!this.victory) {
        this.victorySound.play()
        this.victory = true
      }
    }, null, this)
  }

  render () {
    if (__DEV__) {
      this.game.debug.cameraInfo(this.game.camera, 32, 32)
      this.game.debug.spriteCoords(this.player1, 32, 700)
    }
  }
}

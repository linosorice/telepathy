import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('ground', 'assets/images/ground.png')
    this.game.load.image('circle_mask', 'assets/images/circle_mask.png')
    this.game.load.spritesheet('player', 'assets/images/player.png', 32, 32, 8)
    this.game.load.spritesheet('monster', 'assets/images/monster.png', 32, 32, 8)
    this.game.load.spritesheet('skeleton', 'assets/images/skeleton.png', 32, 32, 8)
    this.game.load.image('shadow', 'assets/images/shadow.png')
    this.game.load.spritesheet('walls', 'assets/images/walls.png', 32, 32, 16)
    this.game.load.spritesheet('dungeon', 'assets/images/dungeon.png', 32, 32, 16)
  }

  create () {
    this.state.start('Game')
  }
}

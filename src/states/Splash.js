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
    this.game.load.image('p1_pic', 'assets/images/p1_pic.jpg')
    this.game.load.image('p2_pic', 'assets/images/p2_pic.jpg')
  }

  create () {
    this.state.start('Game')
  }
}

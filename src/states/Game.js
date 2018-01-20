/* globals __DEV__ */
import Phaser from 'phaser'
import Battlefield from './modules/Battlefield'
import UI from './modules/UI'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let battlefield = new Battlefield(this.game)
    let ui = new UI(this.game)
    battlefield.create()
    ui.create()
  }

  /* render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  } */
}

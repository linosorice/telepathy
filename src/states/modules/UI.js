export default class UI {
  constructor (game) {
    this.game = game
  }

  create () {
    this.game.add.text(200, 80, 'Attack ', {
      font: '40px Bangers',
      fill: '#FFFFFF',
      smoothed: true
    }).anchor.setTo(0.5)
    this.game.add.text(this.game.world.width - 200, 80, 'Defend ', {
      font: '40px Bangers',
      fill: '#FFFFFF',
      smoothed: true
    }).anchor.setTo(0.5)

    // Players pics
    var bmd = this.game.make.bitmapData(128, 128)
    var p1Pic = this.game.add.sprite(0, 0, 'p1_pic')
    p1Pic.width = 128
    p1Pic.height = 128
    bmd.alphaMask(p1Pic, 'circle_mask')
    this.pic_1 = this.game.add.image(72, 150, bmd)
    this.pic_1.anchor.set(0.5, 1)
    p1Pic.visible = false

    bmd = this.game.make.bitmapData(128, 128)
    var p2Pic = this.game.add.sprite(0, 0, 'p2_pic')
    p2Pic.width = 128
    p2Pic.height = 128
    bmd.alphaMask(p2Pic, 'circle_mask')
    this.pic_2 = this.game.add.image(this.game.world.width - 80, 150, bmd)
    this.pic_2.anchor.set(0.5, 1)
    p2Pic.visible = false
  }

  update () {

  }

  onMatch (cellType, count) {
    console.log(cellType, count)
  }
}

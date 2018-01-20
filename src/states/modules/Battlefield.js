import Ground from '../../sprites/Ground'
import { BATTLEFIELD_COLS, BATTLEFIELD_ROWS, TILE_SIZE_SPACED } from '../../constants'

export default class Battlefield {
  constructor (game) {
    this.game = game
  }

  create () {
    this.game.stage.backgroundColor = '#4488AA'
    this.spawnBattlefield()
  }

  spawnBattlefield () {
    for (var i = 0; i < BATTLEFIELD_COLS; i++) {
      for (var j = 0; j < BATTLEFIELD_ROWS; j++) {
        let ground = new Ground({
          game: this.game,
          x: TILE_SIZE_SPACED * (i - (BATTLEFIELD_COLS - 1) / 2) + this.game.world.centerX,
          y: TILE_SIZE_SPACED * (j - (BATTLEFIELD_ROWS - 1) / 2) + this.game.world.centerY,
          asset: 'ground'
        })
        this.game.add.existing(ground)
      }
    }
  }
}

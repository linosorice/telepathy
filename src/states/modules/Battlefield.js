import Room from './Room'
import { BATTLEFIELD_COLS, BATTLEFIELD_ROWS, TILE_SIZE_SPACED, ROOM_SIZE } from '../../constants'

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
        let room = new Room(this.game, {x: i, y: j})
        room.create()
      }
    }
  }
}

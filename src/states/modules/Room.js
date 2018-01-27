import { ROOM_COLS, ROOM_ROWS, TILE_SIZE_SPACED,
  ROOM_SIZE,
  BATTLEFIELD_COLS,
  BATTLEFIELD_ROWS
} from '../../constants'
import Wall from '../../sprites/Wall'
import Ground from '../../sprites/Ground'
import map from '../../map'

export default class Room {
  constructor (game, options, player) {
    this.game = game
    this.options = options
    this.player = player
  }

  create () {
    this.game.stage.backgroundColor = '#4488AA'
    this.spawnRoom()
  }

  spawnRoom () {
    const {x, y} = this.options
    for (var i = 0; i < ROOM_COLS; i++) {
      for (var j = 0; j < ROOM_ROWS; j++) {
        if (i === 0 && (j === ROOM_ROWS / 2 || j === ROOM_ROWS / 2 - 1)) {  // north door
          if (map[x][y].u) {
            this.game.add.existing(
              new Ground({
                game: this.game,
                y: TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
                  ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2),
                x: TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
                  ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2),
                north: false
              })
            )
            continue
          }
        }

        if ((i === ROOM_COLS / 2 || i === ROOM_COLS / 2 - 1) && j === ROOM_ROWS - 1) {  // east door
          if (map[x][y].r) {
            this.game.add.existing(
              new Ground({
                game: this.game,
                y: TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
                  ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2),
                x: TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
                  ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2),
                north: i === ROOM_COLS / 2 ? false : true
              })
            )
            continue
          }
        }

        if (i === ROOM_COLS / 2 - 2 && j === ROOM_ROWS - 1) {  // east wall above door
          if (map[x][y].r) {
            this.game.add.existing(
              new Wall({
                game: this.game,
                y: TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
                  ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2),
                x: TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
                  ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2),
                north: true
              })
            )
            continue
          }
        }

        if (i === ROOM_COLS - 1 && (j === ROOM_ROWS / 2 - 1 || j === ROOM_ROWS / 2)) {  // south door
          if (map[x][y].d) {
            this.game.add.existing(
              new Ground({
                game: this.game,
                y: TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
                  ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2),
                x: TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
                  ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2),
                north: false
              })
            )
            continue
          }
        }

        if ((i === ROOM_COLS / 2 - 1 || i === ROOM_COLS / 2) && j === 0) {  // west door
          if (map[x][y].l) {
            this.game.add.existing(
              new Ground({
                game: this.game,
                y: TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
                  ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2),
                x: TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
                  ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2),
                north: i === ROOM_COLS / 2 ? false : true
              })
            )
            continue
          }
        }

        if (i === ROOM_COLS / 2 - 2 && j === 0) {  // west wall above door
          if (map[x][y].l) {
            this.game.add.existing(
              new Wall({
                game: this.game,
                y: TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
                  ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2),
                x: TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
                  ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2),
                north: true,
                player: this.player
              })
            )
            continue
          }
        }

        if (i === 0 || i === ROOM_COLS - 1 || j === 0 || j === ROOM_ROWS - 1) {  // walls
          this.game.add.existing(
            new Wall({
              game: this.game,
              y: TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
                ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2),
              x: TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
                ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2),
              north: i === 0 && (j !== 0 && j !== ROOM_ROWS - 1),
              player: this.player
            })
          )
          continue
        }

        this.game.add.existing(
          new Ground({
            game: this.game,
            y: TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
              ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2),
            x: TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
              ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2),
            north: i === 1 && ((j !== ROOM_COLS / 2 - 1 && j !== ROOM_COLS / 2) || map[x][y].u === false)
          })
        )
      }
    }
  }
}

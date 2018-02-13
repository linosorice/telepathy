import Phaser from 'phaser'
import Wall from '../sprites/Wall'
import Ground from '../sprites/Ground'

import { BATTLEFIELD_COLS, BATTLEFIELD_ROWS, TILE_SIZE_SPACED, ROOM_SIZE, ROOM_COLS, ROOM_ROWS, VARIANT_TILE, OBJ_PROB } from '../constants'
import map from '../map'

export default class MapSystem {
  constructor (game) {
    this.game = game
    this.game.stage.backgroundColor = '#4488AA'
    this.walls = []
  }

  init () {
    for (var i = 0; i < BATTLEFIELD_COLS; i++) {
      for (var j = 0; j < BATTLEFIELD_ROWS; j++) {
        this.createRoom(i, j)
      }
    }
    return this.walls
  }

  createRoom (x, y) {
    for (var i = 0; i < ROOM_COLS; i++) {
      for (var j = 0; j < ROOM_ROWS; j++) {
        if (i === 0 && (j === ROOM_ROWS / 2 || j === ROOM_ROWS / 2 - 1)) {  // north door
          if (map[`${x}:${y}:${x - 1}:${y}`]) {
            const gx = TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
              ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2)
            const gy = TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
              ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2)
            const frame = Math.random() > VARIANT_TILE ? this.pickObj(Math.random()) : 5
            new Ground(this.game.add.sprite(gx, gy, 'dungeon'), frame)
            continue
          }
        }

        if ((i === ROOM_COLS / 2 || i === ROOM_COLS / 2 - 1) && j === ROOM_ROWS - 1) {  // east door
          if (map[`${x}:${y}:${x}:${y + 1}`]) {
            const gx = TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
              ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2)
            const gy = TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
              ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2)
            const frame = i === ROOM_COLS / 2 ? Math.random() > VARIANT_TILE ? this.pickObj(Math.random()) : 5 : 9
            new Ground(this.game.add.sprite(gx, gy, 'dungeon'), frame)
            continue
          }
        }

        if (i === ROOM_COLS / 2 - 2 && j === ROOM_ROWS - 1) {  // east wall above door
          if (map[`${x}:${y}:${x}:${y + 1}`]) {
            const wx = TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX + ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2)
            const wy = TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY + ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2)
            const frame = 8
            const wall = new Wall(this.game.add.sprite(wx, wy, 'dungeon'), frame)
            this.walls.push(wall)
            continue
          }
        }

        if (i === ROOM_COLS - 1 && (j === ROOM_ROWS / 2 - 1 || j === ROOM_ROWS / 2)) {  // south door
          if (map[`${x}:${y}:${x + 1}:${y}`]) {
            const gx = TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
              ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2)
            const gy = TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
              ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2)
            const frame = Math.random() > VARIANT_TILE ? this.pickObj(Math.random()) : 5
            new Ground(this.game.add.sprite(gx, gy, 'dungeon'), frame)
            continue
          }
        }

        if ((i === ROOM_COLS / 2 - 1 || i === ROOM_COLS / 2) && j === 0) {  // west door
          if (map[`${x}:${y}:${x}:${y - 1}`]) {
            const gx = TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
              ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2)
            const gy = TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
              ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2)
            const frame = i === ROOM_COLS / 2 ? Math.random() > VARIANT_TILE ? this.pickObj(Math.random()) : 5 : 9
            new Ground(this.game.add.sprite(gx, gy, 'dungeon'), frame)
            continue
          }
        }

        if (i === ROOM_COLS / 2 - 2 && j === 0) {  // west wall above door
          if (map[`${x}:${y}:${x}:${y - 1}`]) {
            const wx = TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
              ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2)
            const wy = TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
              ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2)
            const frame = 8
            const wall = new Wall(this.game.add.sprite(wx, wy, 'dungeon'), frame)
            this.walls.push(wall)
            continue
          }
        }

        if (i === 0 || i === ROOM_COLS - 1 || j === 0 || j === ROOM_ROWS - 1) {  // walls
          const wx = TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
            ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2)
          const wy = TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
            ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2)

          const frame = i === 0 && (j !== 0 && j !== ROOM_ROWS - 1) ? 8 : Math.random() > VARIANT_TILE ? 0 : 1
          const wall = new Wall(this.game.add.sprite(wx, wy, 'dungeon'), frame)
          this.walls.push(wall)
          continue
        }

        const gx = TILE_SIZE_SPACED * (j - (ROOM_ROWS - 1) / 2) + this.game.world.centerX +
          ROOM_SIZE * (y - (BATTLEFIELD_ROWS - 1) / 2)
        const gy = TILE_SIZE_SPACED * (i - (ROOM_COLS - 1) / 2) + this.game.world.centerY +
          ROOM_SIZE * (x - (BATTLEFIELD_COLS - 1) / 2)
        const frame = i === 1 && ((j !== ROOM_COLS / 2 - 1 && j !== ROOM_COLS / 2) || !map[`${x}:${y}:${x - 1}:${y}`]) ? 9 : Math.random() > VARIANT_TILE ? this.pickObj(Math.random()) : 5
        new Ground(this.game.add.sprite(gx, gy, 'dungeon'), frame)
      }
    }
  }

  pickObj (r) {
    if (r < OBJ_PROB) {
      return 10
    }
    if (r < 2 * OBJ_PROB) {
      return 11
    }
    if (r < 3 * OBJ_PROB) {
      return 12
    }
    if (r < 4 * OBJ_PROB) {
      return 13
    }
    if (r < 5 * OBJ_PROB) {
      return 14
    }
    return 4
  }
}

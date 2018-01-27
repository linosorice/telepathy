const TILE_SIZE = 32
const TILE_SPACING = 0
const CELL_SCALE = 0.5
const TILE_SIZE_SPACED = (TILE_SIZE + TILE_SPACING) * CELL_SCALE
const ANIMATIONS_SPEED = 10
const BATTLEFIELD_COLS = 5
const BATTLEFIELD_ROWS = 5
const ROOM_COLS = 11
const ROOM_ROWS = 11
const ROOM_SIZE = ROOM_COLS * TILE_SIZE_SPACED

const VARIANT_TILE = 0.05
//const WALL_TILE_SIZE = 16
//const WALL_TILE_SIZE_SPACED = (WALL_TILE_SIZE + TILE_SPACING) * CELL_SCALE
//const ROOM_SIZE = (ROOM_COLS - 2) * TILE_SIZE_SPACED + 2 * WALL_TILE_SIZE_SPACED

export { TILE_SIZE, TILE_SPACING, CELL_SCALE, TILE_SIZE_SPACED, BATTLEFIELD_COLS, BATTLEFIELD_ROWS,
  ROOM_ROWS,
  ROOM_COLS,
  ROOM_SIZE,
  VARIANT_TILE,
  ANIMATIONS_SPEED
  }

export type BlockType = 'i' | 'o' | 's' | 'z' | 'j' | 'l' | 't';

export type Block = {
  x: number;
  y: number;
  turn: Turn;
  type: BlockType;
};

export type Tile = {
  x: number;
  y: number;
  type: BlockType;
};

export type BlockShapeType = Readonly<{
  [key in BlockType]: Readonly<{
    tiles: Readonly<
      [
        Readonly<[number, number]>,
        Readonly<[number, number]>,
        Readonly<[number, number]>,
        Readonly<[number, number]>
      ]
    >;
    center: Readonly<[number, number]>;
  }>;
}>;

export type MoveType = 'left' | 'right' | 'turn';

export type Turn = 0 | 1 | 2 | 3;

export const BLOCK_TYPES: Readonly<BlockType[]> = [
  'i',
  'o',
  's',
  'z',
  'j',
  'l',
  't',
];

export const BLOCK_SHAPES: BlockShapeType = {
  i: {
    tiles: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    center: [1.5, 0.5],
  },
  o: {
    tiles: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    center: [0.5, 0.5],
  },
  s: {
    tiles: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    center: [1, 0],
  },
  z: {
    tiles: [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
    center: [1, 0],
  },
  j: {
    tiles: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    center: [1, 0],
  },
  l: {
    tiles: [
      [0, 0],
      [0, 1],
      [1, 0],
      [2, 0],
    ],
    center: [1, 0],
  },
  t: {
    tiles: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
    center: [1, 0],
  },
} as const;

export const COLOR_NAME = {
  i: 'block-type-i',
  o: 'block-type-o',
  s: 'block-type-s',
  z: 'block-type-z',
  j: 'block-type-j',
  l: 'block-type-l',
  t: 'block-type-t',
} as const;

export const getTiles = (block: Block): Tile[] => {
  const blockShape = BLOCK_SHAPES[block.type];

  return blockShape.tiles
    .map((tile) =>
      turn(
        tile[0],
        tile[1],
        blockShape.center[0],
        blockShape.center[1],
        block.turn
      )
    )
    .map(([x, y]) => ({
      x: block.x + x,
      y: block.y + y,
      type: block.type,
    }));
};

export const getNextBlock = (
  fallingBlock: Block | null,
  boardWidth: number,
  boardHeight: number,
  tiles: Tile[]
): Block | null => {
  if (fallingBlock === null) {
    // ????????????????????????????????????.
    const type = BLOCK_TYPES[Math.floor(BLOCK_TYPES.length * Math.random())];
    return {
      x: Math.floor(boardWidth / 2 - 0.5 - BLOCK_SHAPES[type].center[0]),
      y: boardHeight - 1,
      turn: 0,
      type,
    };
  }

  if (Math.min(...getTiles(fallingBlock).map((tile) => tile.y)) <= 0) {
    // ??????????????????????????????.
    return null;
  }

  // ????????????????????????????????????.
  const nextBlock = {
    ...fallingBlock,
    y: fallingBlock.y - 1,
  };

  // ???????????????????????????????????????????????????null?????????.
  for (const tile of getTiles(nextBlock)) {
    for (const t of tiles) {
      if (tile.x == t.x && tile.y == t.y) {
        return null;
      }
    }
  }

  return nextBlock;
};

export const turnOnce = (
  x: number,
  y: number,
  centerX: number,
  centerY: number
): [number, number] => [centerX + y - centerY, centerY - (x - centerX)];

export const turn = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  turnVal: Turn
): [number, number] => {
  let res: [number, number] = [x, y];
  for (let i = 0; i < turnVal; i++) {
    res = turnOnce(res[0], res[1], centerX, centerY);
  }
  return res;
};

export const moveBlock = (
  block: Block,
  move: MoveType,
  boardWidth: number,
  tiles: Tile[]
): Block | null => {
  const movedBlock = (() => {
    switch (move) {
      case 'left':
        return {
          ...block,
          x: block.x - 1,
        };
      case 'right':
        return {
          ...block,
          x: block.x + 1,
        };
      case 'turn':
        return {
          ...block,
          turn: ((block.turn + 1) % 4) as Turn,
        };
    }
  })();

  const tilesX = getTiles(movedBlock).map(({ x }) => x);

  // ????????????????????????null???????????????.
  if (Math.min(...tilesX) < 0 || Math.max(...tilesX) >= boardWidth) {
    return null;
  }

  // ???????????????????????????????????????????????????null?????????.
  for (const tile of getTiles(movedBlock)) {
    for (const t of tiles) {
      if (tile.x == t.x && tile.y == t.y) {
        return null;
      }
    }
  }

  return movedBlock;
};

export const getCompletedRows = (
  tiles: Tile[],
  boardWidth: number
): number[] => {
  // ?????????
  return (
    Array.from(new Set(tiles.map(({ y }) => y)))
      // ????????????????????? = ??????
      .filter((y) => tiles.filter((tile) => tile.y === y).length === boardWidth)
  );
};

export const deleteRows = (tiles: Tile[], rows: number[]): Tile[] => {
  return (
    tiles
      // ?????????????????????
      .filter(({ y }) => !rows.includes(y))
      // ?????????????????????????????????????????????????????????????????????????????????
      .map((tile) => ({
        ...tile,
        y: tile.y - rows.filter((row) => row < tile.y).length,
      }))
  );
};

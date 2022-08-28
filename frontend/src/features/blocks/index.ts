export type BlockType = 'i' | 'o' | 's' | 'z' | 'j' | 'l' | 't';

export type Block = {
  x: number;
  y: number;
  turn: Turn;
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

/**
 * x, yで指定されるタイルにブロックが存在する場合は、それを返却する.
 */
export const findBlock = (
  blocks: Block[],
  x: number,
  y: number
): Block | undefined => {
  for (const block of blocks) {
    for (const tile of getTiles(block)) {
      if (x === block.x + tile[0] && y === block.y + tile[1]) {
        return block;
      }
    }
  }
};

export const getTiles = (block: Block) => {
  const blockShape = BLOCK_SHAPES[block.type];

  return blockShape.tiles.map((tile) =>
    turn(
      tile[0],
      tile[1],
      blockShape.center[0],
      blockShape.center[1],
      block.turn
    )
  );
};

export const getNextBlock = (
  fallingBlock: Block | null,
  boardWidth: number,
  boardHeight: number,
  blocks: Block[]
): Block | null => {
  if (fallingBlock === null) {
    // 新しいブロックを作成する.
    const type = BLOCK_TYPES[Math.floor(BLOCK_TYPES.length * Math.random())];
    return {
      x: Math.floor(boardWidth / 2 - 0.5 - BLOCK_SHAPES[type].center[0]),
      y: boardHeight - 1,
      turn: 0,
      type,
    };
  }

  if (
    Math.min(
      ...getTiles(fallingBlock).map((item) => item[1] + fallingBlock.y)
    ) <= 0
  ) {
    // 既に最下段にいる場合.
    return null;
  }

  // ブロックを一段下に落とす.
  const nextBlock = {
    ...fallingBlock,
    y: fallingBlock.y - 1,
  };

  for (const tile of getTiles(nextBlock)) {
    if (findBlock(blocks, tile[0] + nextBlock.x, tile[1] + nextBlock.y)) {
      return null;
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
  blocks: Block[]
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

  const tilesX = getTiles(movedBlock).map(([x]) => x + movedBlock.x);

  // 移動先が不正ならnullを返却する.
  if (Math.min(...tilesX) < 0 || Math.max(...tilesX) >= boardWidth) {
    return null;
  }

  for (const tile of getTiles(movedBlock)) {
    if (findBlock(blocks, tile[0] + movedBlock.x, tile[1] + movedBlock.y)) {
      return null;
    }
  }

  return movedBlock;
};

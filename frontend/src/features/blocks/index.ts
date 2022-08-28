export type BlockType = 'i' | 'o' | 's' | 'z' | 'j' | 'l' | 't';

export type Block = {
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

/**
 * x, yで指定されるタイルにブロックが存在する場合は、それを返却する.
 */
export const findBlock = (
  blocks: Block[],
  x: number,
  y: number
): Block | undefined => {
  for (const block of blocks) {
    for (const shape of BLOCK_SHAPES[block.type].tiles) {
      if (x === block.x + shape[0] && y === block.y + shape[1]) {
        return block;
      }
    }
  }
};

export const getNextBlock = (
  fallingBlock: Block | null,
  boardWidth: number,
  boardHeight: number
): Block | null => {
  if (fallingBlock === null) {
    // 新しいブロックを作成する.
    const type = BLOCK_TYPES[Math.floor(BLOCK_TYPES.length * Math.random())];
    return {
      x: Math.floor(boardWidth / 2 - 0.5 - BLOCK_SHAPES[type].center[0]),
      y: boardHeight - 1,
      type,
    };
  }

  if (fallingBlock.y === 0) {
    // TODO: 既存のブロックに接したことを判定する.
    return null;
  }

  // ブロックを一段下に落とす.
  return {
    ...fallingBlock,
    y: fallingBlock.y - 1,
  };
};

export const turnOnce = (
  x: number,
  y: number,
  centerX: number,
  centerY: number
) => [centerX + y - centerY, centerY - (x - centerX)];

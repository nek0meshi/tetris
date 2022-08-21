export type BlockType = 'i' | 'o' | 's' | 'z' | 'j' | 'l' | 't';

export type Block = {
  x: number;
  y: number;
  type: BlockType;
};

export const BLOCK_SHAPES = {
  i: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  o: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  s: [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
  z: [
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 0],
  ],
  j: [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
  ],
  l: [
    [0, 0],
    [0, 1],
    [1, 0],
    [2, 0],
  ],
  t: [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 0],
  ],
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
    for (const shape of BLOCK_SHAPES[block.type]) {
      if (x === block.x + shape[0] && y === block.y + shape[1]) {
        return block;
      }
    }
  }
};

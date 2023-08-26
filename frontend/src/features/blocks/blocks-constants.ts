import { BlockShapeType, BlockType } from './blocks-types';

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

import { useState } from 'react';
import { Block } from '../features/blocks';

const DUMMY_BLOCKS: Block[] = [
  { x: 1, y: 1, type: 'i' },
  { x: 1, y: 3, type: 'o' },
  { x: 4, y: 0, type: 's' },
  { x: 3, y: 2, type: 'z' },
  { x: 7, y: 0, type: 'j' },
  { x: 5, y: 3, type: 'l' },
  { x: 7, y: 2, type: 't' },
];

const useBlocks = () => {
  const [blocks] = useState(DUMMY_BLOCKS);

  return {
    blocks,
  };
};

export default useBlocks;

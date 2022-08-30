import { useState } from 'react';
import {
  Block,
  MoveType,
  getNextBlock,
  moveBlock,
  Tile,
  getTiles,
} from '../features/blocks';

const useBlocks = (boardWidth: number, boardHeight: number) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [fallingBlock, setFallingBlock] = useState<Block | null>(null);

  const nextStep = () => {
    const movedBlock = getNextBlock(
      fallingBlock,
      boardWidth,
      boardHeight,
      tiles
    );

    if (movedBlock === null && fallingBlock != null) {
      setTiles([...tiles, ...getTiles(fallingBlock)]);
    }

    setFallingBlock(movedBlock);
  };

  const move = (m: MoveType) => {
    if (fallingBlock === null) {
      return;
    }

    setFallingBlock(
      moveBlock(fallingBlock, m, boardWidth, tiles) || fallingBlock
    );
  };

  return {
    tiles,
    fallingBlock,
    nextStep,
    move,
  };
};

export default useBlocks;

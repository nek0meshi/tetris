import { useState } from 'react';
import {
  Block,
  MoveType,
  getNextBlock,
  moveBlock,
  getCompletedRows,
  deleteRows,
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
      let nextTiles = [...tiles, ...getTiles(fallingBlock)];

      const completedRows = getCompletedRows(nextTiles, boardWidth);

      if (completedRows.length) {
        nextTiles = deleteRows(nextTiles, completedRows);
      }

      setTiles(nextTiles);
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

  /**
   * 最下層までブロックを落とす.
   */
  const fall = () => {
    if (fallingBlock === null) {
      return;
    }

    /**
     * 最下層に到達するまで繰り返し更新する.
     */
    let currentBlock = { ...fallingBlock };

    // whileループと等価だが、不具合による無限ループを防ぐためにforループで記述する.
    for (let i = 0; i < boardHeight; i++) {
      const movedBlock = getNextBlock(
        currentBlock,
        boardWidth,
        boardHeight,
        tiles
      );

      if (!movedBlock) {
        break;
      }

      currentBlock = movedBlock;
    }

    setFallingBlock(currentBlock);
  };

  return {
    tiles,
    fallingBlock,
    nextStep,
    move,
    fall,
  };
};

export default useBlocks;

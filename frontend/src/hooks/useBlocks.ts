import { useCallback, useState } from 'react';
import {
  getNextBlock,
  moveBlock,
  getCompletedRows,
  deleteRows,
  getTiles,
} from '../features/blocks';
import { Block, MoveType, Tile } from '../features/blocks/blocks-types';

const useBlocks = (boardWidth: number, boardHeight: number) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [fallingBlock, setFallingBlock] = useState<Block | null>(null);
  const [isGameOvered, setIsGameOvered] = useState(false);

  const nextStep = useCallback(() => {
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

    if (
      movedBlock !== null &&
      Math.max(...tiles.map(({ y }) => y)) >= boardHeight
    ) {
      setIsGameOvered(true);
    }

    setFallingBlock(movedBlock);
  }, [boardWidth, boardHeight, fallingBlock, tiles]);

  const move = useCallback(
    (m: MoveType) => {
      if (fallingBlock === null) {
        return;
      }

      setFallingBlock(
        moveBlock(fallingBlock, m, boardWidth, tiles) || fallingBlock
      );
    },
    [boardWidth, fallingBlock, tiles]
  );

  /**
   * 最下層までブロックを落とす.
   */
  const fall = useCallback(() => {
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
  }, [boardWidth, boardHeight, fallingBlock, setFallingBlock, tiles]);

  return {
    tiles,
    fallingBlock,
    isGameOvered,
    nextStep,
    move,
    fall,
  };
};

export default useBlocks;

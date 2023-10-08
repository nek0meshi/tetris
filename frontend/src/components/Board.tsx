import GameOver from './GameOver';
import Tile from './Tile';
import './Board.scss';
import { getTiles } from '../features/blocks';
import useBlocks from '../hooks/useBlocks';
import useTimer from '../hooks/useTimer';
import useKeyHandler from '../hooks/useKeyHandler';
import { COLOR_NAME } from '../features/blocks/blocks-constants';
import { useCallback, useMemo } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 25;

function Board() {
  const { tiles, fallingBlock, isGameOvered, nextStep, move, fall } = useBlocks(
    BOARD_WIDTH,
    BOARD_HEIGHT
  );

  useTimer(nextStep);

  useKeyHandler(nextStep, move, fall);

  const tilesOnBoard = useMemo(
    () => [...tiles, ...(fallingBlock === null ? [] : getTiles(fallingBlock))],
    [fallingBlock, tiles]
  );

  const createTile = useCallback(
    (x: number, y: number) => {
      const blockType = tilesOnBoard.find(
        (tile) => tile.x === x && tile.y === y
      )?.type;
      const classNames = [blockType ? COLOR_NAME[blockType] : ''];

      return <Tile key={y + BOARD_WIDTH * x} classNames={classNames} />;
    },
    [tilesOnBoard]
  );

  const createLine = useCallback(
    (i: number) => [...Array(BOARD_WIDTH).keys()].map((j) => createTile(j, i)),
    [createTile]
  );

  const lines = useMemo(
    () =>
      [...Array(BOARD_HEIGHT).keys()].map((i) => (
        <div className="TileLine" key={i}>
          {createLine(i)}
        </div>
      )),
    [createLine]
  );

  return (
    <div className="Board">
      {isGameOvered ? <GameOver /> : null}
      <div className="lines-container">{lines}</div>
    </div>
  );
}

export default Board;

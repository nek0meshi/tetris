import Tile from './Tile';
import './Board.scss';
import { COLOR_NAME, findBlock } from '../features/blocks';
import useBlocks from '../hooks/useBlocks';
import { useEffect } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 25;

function Board() {
  const { blocks, fallingBlock, nextStep, move } = useBlocks(
    BOARD_WIDTH,
    BOARD_HEIGHT
  );
  const blocksOnBoard = [
    ...blocks,
    ...(fallingBlock === null ? [] : [fallingBlock]),
  ];
  const createTile = (x: number, y: number) => {
    const block = findBlock(blocksOnBoard, x, y);
    const classNames = [block ? COLOR_NAME[block.type] : ''];

    return <Tile key={y + BOARD_WIDTH * x} classNames={classNames} />;
  };
  const createLine = (i: number) =>
    [...Array(BOARD_WIDTH).keys()].map((j) => createTile(j, i));
  const lines = [...Array(BOARD_HEIGHT).keys()].map((i) => (
    <div className="TileLine" key={i}>
      {createLine(i)}
    </div>
  ));

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'h':
          move('left');
          break;
        case 'ArrowRight':
        case 'l':
          move('right');
          break;
        case 'ArrowUp':
        case 'k':
          move('turn');
          break;
        case ' ':
        case 'ArrowDown':
          nextStep();
          break;
      }
    };
    window.addEventListener('keydown', keyEventHandler);

    return () => {
      window.removeEventListener('keydown', keyEventHandler);
    };
  });

  return (
    <div className="Board">
      <div className="lines-container">{lines}</div>
    </div>
  );
}

export default Board;

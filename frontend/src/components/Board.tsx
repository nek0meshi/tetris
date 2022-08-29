import Tile from './Tile';
import './Board.scss';
import { COLOR_NAME, findBlock } from '../features/blocks';
import useBlocks from '../hooks/useBlocks';
import useTimer from '../hooks/useTimer';
import useKeyHandler from '../hooks/useKeyHandler';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 25;

function Board() {
  const { blocks, fallingBlock, nextStep, move } = useBlocks(
    BOARD_WIDTH,
    BOARD_HEIGHT
  );

  useTimer(nextStep);

  useKeyHandler(nextStep, move);

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

  return (
    <div className="Board">
      <div className="lines-container">{lines}</div>
    </div>
  );
}

export default Board;

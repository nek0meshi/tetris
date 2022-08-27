import Tile from './Tile';
import './Board.scss';
import { COLOR_NAME, findBlock } from '../features/blocks';
import useBlocks from '../hooks/useBlocks';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 25;

function Board() {
  const { blocks } = useBlocks();
  const createTile = (x: number, y: number) => {
    const block = findBlock(blocks, x, y);
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

  return <div className="Board lines-container">{lines}</div>;
}

export default Board;

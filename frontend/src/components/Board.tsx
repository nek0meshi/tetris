import Tile from './Tile';
import './Board.scss';
import { Block, COLOR_NAME, findBlock } from '../features/blocks';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 25;

// TODO: fix. 現在はダミーデータ.
const blocks: Block[] = [
  { x: 1, y: 1, type: 'i' },
  { x: 1, y: 3, type: 'o' },
  { x: 4, y: 0, type: 's' },
  { x: 3, y: 2, type: 'z' },
  { x: 7, y: 0, type: 'j' },
  { x: 5, y: 3, type: 'l' },
  { x: 7, y: 2, type: 't' },
];

function Board() {
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

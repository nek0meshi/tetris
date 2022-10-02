import Tile from './Tile';
import './Board.scss';

function Board() {
  const createLine = (i: number) =>
    [...Array(10).keys()].map((j) => <Tile key={j + 10 * i} />);
  const lines = [...Array(25).keys()].map((i) => (
    <div className="TileLine" key={i}>
      {createLine(i)}
    </div>
  ));

  return <div className="Board lines-container">{lines}</div>;
}

export default Board;

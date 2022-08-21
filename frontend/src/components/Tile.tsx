import './Tile.scss';

function Tile(props: { classNames?: string[] }) {
  const className = ['Tile', ...(props.classNames || [])].join(' ');

  return <div className={className}></div>;
}

export default Tile;

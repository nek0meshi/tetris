import { useMemo } from 'react';
import './Tile.scss';

type Props = {
  classNames?: string[];
};

function Tile({ classNames = [] }: Props) {
  const className = useMemo(
    () => ['Tile', ...(classNames || [])].join(' '),
    [classNames]
  );

  return <div className={className}></div>;
}

export default Tile;

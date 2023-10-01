import { useMemo } from 'react';
import './GameOver.scss';

function GameOver() {
  // keyに利用している定数について
  //   100, 10000は適当な値.
  //   span, br共通で、重複しない必要がある.
  const text = useMemo(
    () =>
      ['GAME', 'OVER']
        .map((item, index1) =>
          item
            .split('')
            .map((t, index2) => <span key={index1 * 100 + index2}>{t}</span>)
        )
        .reduce(
          (prev, cur, index) =>
            (prev.length > 0
              ? [...prev, <br key={10000 + index} />]
              : []
            ).concat([...cur]),
          []
        ),
    []
  );

  return (
    <div className="GameOver">
      <div className="title-text">{text}</div>
    </div>
  );
}

export default GameOver;

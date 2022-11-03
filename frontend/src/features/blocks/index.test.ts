import * as block from './index';

test('turnOnce', () => {
  const dataSet: [number, number, number, number, number, number][] = [
    // centerが0だった場合
    [1, 1, 0, 0, 1, -1],
    [-1, -1, 0, 0, -1, 1],
    [2, -1, 0, 0, -1, -2],
    [-1, 3, 0, 0, 3, 1],

    // centerが0以外の場合
    [4, 4, 3, 3, 4, 2],
    [2, 2, 3, 3, 2, 4],

    [0, 0, 0.5, 0.5, 0, 1],
    [1, 1, 0.5, 0.5, 1, 0],
  ];

  for (const [x, y, centerX, centerY, resultX, resultY] of dataSet) {
    expect(block.turnOnce(x, y, centerX, centerY)).toStrictEqual([
      resultX,
      resultY,
    ]);
  }
});

test('turn', () => {
  const dataSet: [
    number,
    number,
    number,
    number,
    block.Turn,
    number,
    number
  ][] = [
    // turnが0の場合
    [1, 1, 0, 0, 0, 1, 1],
    [-1, -1, 0, 0, 0, -1, -1],

    // turnが1の場合
    [1, 1, 0, 0, 1, 1, -1],
    [-1, -1, 0, 0, 1, -1, 1],
    [2, -1, 0, 0, 1, -1, -2],
    [-1, 3, 0, 0, 1, 3, 1],
    [4, 4, 3, 3, 1, 4, 2],
    [2, 2, 3, 3, 1, 2, 4],

    // turnが2の場合
    [1, 1, 0, 0, 2, -1, -1],
    [-1, -1, 0, 0, 2, 1, 1],
    [4, 4, 3, 3, 2, 2, 2],
    [2, 2, 3, 3, 2, 4, 4],

    // turnが3の場合
    [1, 1, 0, 0, 3, -1, 1],
  ];

  for (const [x, y, centerX, centerY, turn, resultX, resultY] of dataSet) {
    expect(block.turn(x, y, centerX, centerY, turn)).toStrictEqual([
      resultX,
      resultY,
    ]);
  }
});

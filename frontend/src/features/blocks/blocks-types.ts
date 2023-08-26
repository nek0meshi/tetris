export type BlockType = 'i' | 'o' | 's' | 'z' | 'j' | 'l' | 't';

export type Block = {
  x: number;
  y: number;
  turn: Turn;
  type: BlockType;
};

export type Tile = {
  x: number;
  y: number;
  type: BlockType;
};

export type BlockShapeType = Readonly<{
  [key in BlockType]: Readonly<{
    tiles: Readonly<
      [
        Readonly<[number, number]>,
        Readonly<[number, number]>,
        Readonly<[number, number]>,
        Readonly<[number, number]>
      ]
    >;
    center: Readonly<[number, number]>;
  }>;
}>;

export type MoveType = 'left' | 'right' | 'turn';

export type Turn = 0 | 1 | 2 | 3;

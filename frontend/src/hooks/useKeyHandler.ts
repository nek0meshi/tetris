import { useEffect, useRef } from 'react';
import { MoveType } from '../features/blocks';

const useKeyHandler = (
  nextStep: () => void,
  move: (m: MoveType) => void,
  fall: () => void
) => {
  const refNextStep = useRef(nextStep);
  const refMove = useRef(move);
  const refFall = useRef(fall);
  useEffect(() => {
    refNextStep.current = nextStep;
  }, [nextStep]);
  useEffect(() => {
    refMove.current = move;
  }, [move]);
  useEffect(() => {
    refFall.current = fall;
  }, [fall]);

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'h':
          refMove.current('left');
          break;
        case 'ArrowRight':
        case 'l':
          refMove.current('right');
          break;
        case 'ArrowUp':
        case 'k':
          refMove.current('turn');
          break;
        case 'ArrowDown':
        case 'j':
          refNextStep.current();
          break;
        case ' ':
          refFall.current();
          break;
      }
    };
    window.addEventListener('keydown', keyEventHandler);

    return () => {
      window.removeEventListener('keydown', keyEventHandler);
    };
  }, []);
};

export default useKeyHandler;

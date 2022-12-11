import { useEffect, useRef } from 'react';
import * as timer from '../features/timer';

const useTimer = (callback: () => void) => {
  // ref. https://zenn.dev/kakaka/articles/41f22d2dcc9720
  const refNextStep = useRef(callback);
  useEffect(() => {
    refNextStep.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => refNextStep.current();
    timer.start(tick);

    return () => timer.stop();
  }, []);
};

export default useTimer;

let timerId: NodeJS.Timer | null;
const intervalTime = 1000;

export const start = (callback: () => void) => {
  timerId = setInterval(callback, intervalTime);
};

export const stop = () => {
  if (timerId === null) {
    return;
  }

  clearInterval(timerId);
};

const fibonacciFunc = (number) => {
  if (number === 0) return 0;
  if (number === 1) return 1;
  return fibonacciFunc(number - 2) + fibonacciFunc(number - 1);
};

const fibonacciFunc = (number) => {
  switch (number) {
    case 0:
      return 0;
    case 1:
      return 1;
    default:
      return fibonacciFunc(number - 2) + fibonacciFunc(number - 1);
  }
};

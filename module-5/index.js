// Task 1
const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

delay(1000).then(() => console.log("Hey!")); // → ‘Hey!’ in 1 second

// Task 2
const runPromisesInSeries = (callbackArr) =>
  callbackArr.reduce((acc, callback) => acc.then(callback), Promise.resolve());

runPromisesInSeries([
  () =>
    delay(1000).then(() => {
      console.log("message in 1 second");
    }),
  () =>
    delay(2000).then(() => {
      console.log("message in 3 seconds");
    }),
]);

// Task 3 - Building Promise.all
const Promise_all = (promisesArray) => {
  return new Promise((resolve, reject) => {
    let resultsArray = [];
    let completed = 0;

    if (!promisesArray.length) {
      resolve(resultsArray);
    }

    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((singleResult) => {
          resultsArray[index] = singleResult;
          completed++;

          if (completed === promisesArray.length) {
            resolve(resultsArray);
          }
        })
        .catch((err) => reject(err));
    });
  });
};

// Task 4 fibonaccifunc
// without generator
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

const fibonacci = (number) => {
  let result = [];
  for (let i = 0; i < number; i++) {
    result.push(fibonacciFunc(i));
  }
  return result;
};

let [...first10] = fibonacci(10);
console.log(first10); // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// with generator basics
const fibonacciGenerator = function* () {
  let current = 1;
  let next = 1;
  let previous = 1;
  yield 0;
  yield 1;
  while (true) {
    current = next;
    yield current;
    next += previous;
    previous = current;
  }
};

const iterator = fibonacciGenerator();

const fibonacci = (number) => {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push(iterator.next().value);
  }
  return result;
};

let [...first10] = fibonacci(10);
console.log(first10); // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// with genererator mdn
const fibonacci = function* (number) {
  if (typeof number !== "number") {
    throw new Error("Must be a number");
  }
  let current = (next = previous = 1);
  let current = 1;
  let next = 1;
  let previous = 1;
  yield 0;
  yield 1;
  for (let i = 2; i < number; i++) {
    current = next;
    yield current;
    next += previous;
    previous = current;
  }
};

let [...first10] = fibonacci(10);
console.log(first10); // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// generator interpretation
// with generator syntax
const asyncTask1 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve("first resolved"), 1000)
  );
const asyncTask2 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve("second resolved"), 1000)
  );
const asyncTask3 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject("third rejected"), 1000)
  );
console.log("invoke helper");

function* main() {
  yield asyncTask1();
  yield asyncTask2();
  yield asyncTask3();
}

const iterator = main();

iterator
  .next()
  .value.then((res) => console.log(res))
  .then(
    iterator
      .next()
      .value.then((res) => console.log(res))
      .then(
        iterator
          .next()
          .value.then((res) => console.log(res))
          .catch((e) => {
            console.error("error happened", e);
          })
      )
  );

// with Symbol.iterator syntax

const asyncTask1 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve("first resolved"), 1000)
  );
const asyncTask2 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve("second resolved"), 1000)
  );
const asyncTask3 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject("third rejected"), 1000)
  );
console.log("invoke helper");

const iterator = [asyncTask1(), asyncTask2(), asyncTask3()][Symbol.iterator]();

iterator
  .next()
  .value.then((res) => console.log(res))
  .then(
    iterator
      .next()
      .value.then((res) => console.log(res))
      .then(
        iterator
          .next()
          .value.then((res) => console.log(res))
          .catch((e) => {
            console.error("error happened", e);
          })
      )
  );

// Task 1
const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

delay(1000).then(() => console.log("Hey!")); // → ‘Hey!’ in 1 second

// How to make it with Promise.resolve() ????
// const delay = (ms) => {
//   return setTimeout(() => Promise.resolve(), ms);
// };

// delay(1000).then(() => console.log("Hey!")); // → ‘Hey!’ in 1 second

// Task 2
const runPromisesInSeries = ([callbackOne, callbackTwo]) => {
  callbackOne().then(callbackTwo());
};

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

// Curring

let mergeWords = (firstWord) => (secondWord) => (thirdWord) => (fourthWord) => {
  return () => `${firstWord} ${secondWord} ${thirdWord} ${fourthWord}`;
};

mergeWords("GNU")("is")("not")("Unix.")(); // Output: ‘GNU is not Unix.’

// Every/Some

let goodUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];

const checkUsersValid = (arrayExcample) => (arrayToCheck) => {
  return arrayToCheck.every((checkObj) =>
    arrayExcample.some((excObj) => excObj.id === checkObj.id)
  );
};

let testAllValid = checkUsersValid(goodUsers);
testAllValid([{ id: 2 }, { id: 1 }]); // Output: true
testAllValid([{ id: 2 }, { id: 4 }, { id: 1 }]); // Output: false

// Reduce

const countWords = (array) =>
  array.reduce((acc, fruit) => {
    if (acc[fruit]) {
      acc[fruit]++;
      return acc;
    } else {
      acc[fruit] = 1;
      return acc;
    }
  }, {});

// Palindrome

const isPalindrome = (string) => {
  const reverseString = string.split("").reverse().join("");

  return string.slice(0, Math.floor(string.length / 2)) ===
    reverseString.slice(0, Math.floor(string.length / 2))
    ? "The entry is a palindrome"
    : "Entry is not a palindrome";
};

isPalindrome("madam"); // Output: ‘The entry is a palindrome’
isPalindrome("maam"); // Output: ‘The entry is a palindrome’
isPalindrome("fox"); // Output: ‘Entry is not a palindrome’

// Recursion
const factorial = (n) => {
  return n < 2 ? 1 : n * factorial(n - 1);
};

factorial(5); // 120

const amountToCoins = (number, array) => {
  let coins = [...array];

  if (number === 0) {
    return [];
  }

  if (number >= coins[0]) {
    let left = number - coins[0];
    return [coins[0]].concat(amountToCoins(left, coins));
  } else {
    coins.shift();
    return amountToCoins(number, coins);
  }
};

amountToCoins(46, [25, 10, 5, 2, 1]); // Output: [25, 10, 10, 1]

const repeat = (callback, number) => {
  for (let i = 0; i < number; i++) {
    callback();
  }
};

repeat(() => console.log("Wassup"), 5);

const repeat = (callback, number) => {
  if (!number) {
    return;
  }

  callback();
  repeat(callback, number - 1);
};

repeat(() => console.log("Wassup"), 5);

const reduce = (array, callback, initialValue) => {
  if (!array || !callback) {
    throw new Error("No Array or Callback Found");
  }
  let result = initialValue ? initialValue : 0;
  array.forEach((elem) => {
    result = callback(result, elem);
  });
  return result;
};

reduce(
  [1, 2, 3],
  function (prev, curr, index, arr) {
    return prev + curr;
  },
  0
); // 6

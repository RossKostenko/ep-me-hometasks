//Task 1

const changeSingleLetterCase = (letter) => {
  if (/[a-z]/.test(letter)) {
    return letter.toLocaleUpperCase();
  } else if (/[A-Z]/.test(letter)) {
    return letter.toLocaleLowerCase();
  } else {
    return letter;
  }
};

const changeCase = (string) => {
  if (typeof string !== "string") {
    return;
  }

  return string.split("").map(changeSingleLetterCase).join("");
};

console.log(changeCase("21century")); // Output: 21CENTURY
console.log(changeCase("Hybris"));

//Task 2 Filter Non Unique
const filterNonUnique = (arr) =>
  arr.filter((num) => arr.indexOf(num) === arr.lastIndexOf(num));

console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5])); // Output: [1,3,5]
console.log(filterNonUnique([1, 2, 3, 4])); // Output: [1,2,3,4]

// Task 3
const alphabetSort = (string) => {
  return string.split("").sort().join("");
};

console.log(alphabetSort("Python")); // Output: ‘Phnoty’

// Task 4
const getSecondMiminum = (arr) => arr.sort((a, b) => a - b)[1];

console.log(getSecondMiminum([5, 0, 7, 3, 8]));

// Task 5
const doubleEveryEven = (arr) =>
  arr.map((number) => (number % 2 === 0 ? number * 2 : number));

console.log(doubleEveryEven([2, 0, 7, 3, 8, 4]));

// Task 6
const getArrayElementsPairs = (arrOne, arrTwo) => {
  const result = [];
  arrOne.forEach((firstElement) => {
    arrTwo.forEach((secondeElement) => {
      result.push([firstElement, secondeElement]);
    });
  });
  return result;
};

console.log(getArrayElementsPairs([1, 2], ["a", "b"]));

// Task7 deeEqual
const deepEqual = (objOne, objTwo) => {
  if (objOne === objTwo) {
    return true;
  }

  const check =
    typeof objOne === "object" &&
    objOne !== null &&
    typeof objTwo === "object" &&
    objTwo !== null;

  if (check) {
    if (Object.keys(objOne).length !== Object.keys(objTwo).length) {
      return false;
    }

    for (let prop in objOne) {
      if (objTwo.hasOwnProperty(prop)) {
        if (!deepEqual(objOne[prop], objTwo[prop])) {
          return false;
        }
      } else {
			return false
		};
    }
    return true;
  } else {
    return false;
  }
};

// Task 8 formatDate
const chechValue = (value) => {
  if (Array.isArray(value)) {
    return Date.parse(...value);
  } else if (typeof value === "number") {
    return Date.parse(new Date(value));
  } else {
    return Date.parse(value);
  }
};

const formatDate = (value) => {
  let timestamp = chechValue(value);

  if (timestamp) {
    return new Date(timestamp).toLocaleDateString('uk-UA', {
		day: "numeric",
		month: "numeric",
		year: "2-digit"
	 })
  } else {
	  return timestamp
	}
};

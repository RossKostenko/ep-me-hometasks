// Array To List

const arrayToList = (array) => {
  let list = {};

  if (array.length === 1) {
    list.value = array[0];
    list.rest = null;
    return list;
  } else {
    list.value = array[0];
    array.shift();
    list.rest = arrayToList(array);
    return list;
  }
};

arrayToList([10, 20]); // {value: 10, rest: {value: 20, rest: null}}

const listToArray = (list) => {
  if (list.rest === null) {
    return [list.value];
  } else {
    return [list.value, ...listToArray(list.rest)];
  }
};

listToArray({ value: 10, rest: { value: 20, rest: null } }); // [10, 20]

// Get Key Value Pairs
// short
const getKeyValuePairs = (obj) => Object.entries(obj);
// long
const getKeyValuePairs = (obj) => {
  let result = [];
  for (const property in obj) {
    result.push([property, obj[property]]);
  }
  return result;
};

getKeyValuePairs({ red: "#FF0000", green: "#00FF00", white: "#FFFFFF" });
// [["red","#FF0000"],["green","#00FF00"],["white","#FFFFFF"]]

// Invert Key Value
const invertKeyValue = (obj) => {
  let result = {};
  for (let property in obj) {
    result[obj[property]] = property;
  }
  return result;
};
invertKeyValue({ red: "#FF0000", green: "#00FF00", white: "#FFFFFF" });
// {"#FF0000":"red","#00FF00":"green","#FFFFFF":"white"}

// Get All Methods
const getAllMethods = (obj) =>
  Object.getOwnPropertyNames(obj).filter(
    (property) => typeof obj[property] === "function"
  );

// Clock
const getCurrentTime = () =>
  console.log(new Date(Date.now()).toLocaleTimeString());

class Clock {
  constructor() {
    this.currentTime;
  }

  start() {
    this.currentTime = setInterval(() => getCurrentTime(), 1000);
  }

  stop() {
    clearInterval(this.currentTime);
  }
}

const clock = new Clock();

clock.start();
clock.stop();

// Groups
class Group {
  static from(arr) {
    return new Set(arr);
  }
}

let group = Group.from([10, 20]);

console.log(group.has(10)); // → true
console.log(group.has(30)); // → false
group.add(10);
group.delete(10);
console.log(group.has(10)); // → false

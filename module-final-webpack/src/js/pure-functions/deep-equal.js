export function deepEqual(objOne, objTwo) {
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
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

// export function deepEqual(objOne, objTwo) {
//   if (JSON.stringify(objOne) === JSON.stringify(objTwo)) {
//     return true;
//   }
//   return false;
// }

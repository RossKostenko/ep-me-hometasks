// Symbol.iterator
// it allows to work with it via for of loop
const draonArmyWithIterator = {
  [Symbol.iterator]: () => {
    return {
      next: () => {
        const enoughDragonsSpawned = Math.random() > 0.75;
        if (!enoughDragonsSpawned) {
          return {
            value: "some dragon",
            done: false,
          };
        }
        return { done: true };
      },
    };
  },
};

for (const dragon of draonArmyWithIterator) {
  console.log(dragon);
}

// Generators is synthetic sugar for Symbol.iterators
const draonArmyWithGenerator = {
  [Symbol.iterator]: function* () {
    const enoughDragonsSpawned = Math.random() > 0.75;
    if (enoughDragonsSpawned) return;
    yield "some dragon";
  },
};

for (const dragon of draonArmyWithGenerator) {
  console.log(dragon);
}

const dragonGenerator = function* () {
  const enoughDragonsSpawned = Math.random() > 0.75;
  if (enoughDragonsSpawned) return;
  yield "some dragon";
};

const dragonIterator = dragonGenerator();

dragonIterator.next();

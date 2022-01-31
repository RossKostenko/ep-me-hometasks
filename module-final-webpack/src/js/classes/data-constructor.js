import { deepEqual } from "../pure-functions/deep-equal";

export class DataConstructor {
  constructor() {
    this._value = [];
    this.observers = [];
  }
  get value() {
    return this._value;
  }

  set value(incomingValue) {
    if (!deepEqual(this._value, incomingValue)) {
      this._value = incomingValue;
      this.observers.forEach((callbackFn) => {
        callbackFn();
      });
      console.log("deep Equal works");
    }
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
}

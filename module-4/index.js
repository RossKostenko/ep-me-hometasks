// Point
// first
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus({ x, y }) {
    return new Point(this.x + x, this.y + y);
  }
}

// second
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }
}

// ES5
function Point(x, y) {
  this.x = x;
  this.y = y;

  this.plus = function (point) {
    return new Point(this.x + point.x, this.y + point.y);
  };
}

// Speaker and Screamer
// ES5
function Speaker(name) {
  this.name = name;

  this.speak = function (text) {
    return this.name + " says " + text;
  };
}

function Screamer(name) {
  Speaker.call(this, name);

  this.speak = function (text) {
    return this.name + " shouts " + text.toUpperCase();
  };
}
new Speaker("Mr. Calm").speak("easy, man"); // → “Mr. Calm says easy, man”
new Screamer("Mr. Loud").speak("hell yeah"); // → “Mr. Loud shouts HELL YEAH”

//ES6
class Speaker {
  constructor(name) {
    this.name = name;
  }

  speak(text) {
    return `${this.name} says ${text}`;
  }
}

class Screamer extends Speaker {
  constructor(name) {
    super(name);
  }

  speak(text) {
    return `${this.name} shouts ${text.toUpperCase()}`;
  }
}

new Speaker("Mr. Calm").speak("easy, man"); // → “Mr. Calm says easy, man”
new Screamer("Mr. Loud").speak("hell yeah"); // → “Mr. Loud shouts HELL YEAH”

//The Reading List
class Book {
  constructor({ title, genre, author, read, readDate }) {
    if (title || genre || author) {
      this.title = title || "";
      this.genre = genre || "";
      this.author = author || "";
      this.read = read || false;
      this.readDate = readDate || null;
    } else {
      throw new Error("Book not found");
    }
  }

  markAsRead() {
    this.read = true;
    this.readDate = new Date(Date.now());
  }
}

// BookList implementation 1
class BookList {
  constructor(books) {
    this.books = Array.isArray(books) ? books : [];
    this.setListProperties = function () {
      const readArr = [];
      const notReadArr = [];
      this.books.forEach((book) =>
        book.read ? readArr.push(book) : notReadArr.push(book)
      );
      this.booksFinished = readArr.length;
      this.booksNotFinished = notReadArr.length;
      this.nextBook = notReadArr[1] || null;
      this.currentBook = notReadArr[0] || null;
      this.lastBook = readArr[(readArr, length - 1)] || null;
    };
    this.setListProperties();
  }

  add(book) {
    this.books.push(book);
    this.setListProperties();
  }

  finishCurrentBook() {
    this.currentBook.markAsRead();
    this.setListProperties();
  }
}

// BookList implementation 2

const setListProperties = (list) => {
  const readArr = [];
  const notReadArr = [];
  list.books.forEach((book) =>
    book.read ? readArr.push(book) : notReadArr.push(book)
  );
  list.booksFinished = readArr.length;
  list.booksNotFinished = notReadArr.length;
  list.nextBook = notReadArr[1] || null;
  list.currentBook = notReadArr[0] || null;
  list.lastBook = readArr[readArr.length - 1] || null;
};

class BookList {
  constructor(books) {
    this.books = Array.isArray(books) ? books : [];
    setListProperties(this);
  }

  add(book) {
    this.books.push(book);
    setListProperties(this);
  }

  finishCurrentBook() {
    this.currentBook.markAsRead();
    setListProperties(this);
  }
}

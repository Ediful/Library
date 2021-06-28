function addBook() {
  // probably something to do with the constructor
}

function displayBooks(library) {

}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

const bookslist = document.getElementById('bookslist');

let Library = [];

Library[0] = new Book('The Hobbit 1', 'J.R.R. Tolkien', 295, 'not read yet');
Library[1] = new Book('The Hobbit 2', 'J.R.R. Tolkien', 295, 'not read yet');
Library[2] = new Book('The Hobbit 3', 'J.R.R. Tolkien', 295, 'not read yet');

// flexbox bad choice can't properly align shit, should use table
Library.forEach(book => {
  // add 1 row and 5 columns to the grid
  // add 5 new <p> elements and attach them
});


/*
// add items with display:flex, attach class to each item to achieve this effect
Library.forEach(book => {
  let bookEntry = document.createElement('div');
  let entryTitle = document.createElement('p');
  entryTitle.textContent = book.title;
  let entryAuthor = document.createElement('p');
  entryAuthor.textContent = book.author;
  let entryPages = document.createElement('p');
  entryPages.textContent = book.pages;
  let entryRead = document.createElement('p');
  entryRead.textContent = book.read;
  bookEntry.classList.add('book-entry');
  bookEntry.appendChild(entryTitle);
  bookEntry.appendChild(entryAuthor);
  bookEntry.appendChild(entryPages);
  bookEntry.appendChild(entryRead);
  bookslist.appendChild(bookEntry);
});
*/
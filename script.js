let Library = [];
/*
// Used for testing purposes prior to local storage being implemented
Library[0] = {title:"The Hobbit", author:"J.R.R. Tolkien", pages:309, read:false};
Library[1] = {title:"Harry Potter and the Sorcerer's Stone", author:"J.K. Rowling", pages:310, read:false};
Library[2] = {title:"A Game of Thrones", author:"George R.R. Martin", pages:694, read:true};
*/
loadLibrary();

document.getElementById('add-book').addEventListener('click', () => form.style.display = "block");
document.getElementById('close').addEventListener('click', () => form.style.display = "none");
document.getElementById('submit').addEventListener('click', submitForm);
displayLibrary();

// constructs book object using form data
class Book {
  constructor(title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
    this.read = form.read.checked;
  }
}

// store library to local storage
function storeLibrary() {
  localStorage.setItem("library", JSON.stringify(Library));
}

// load library when app is first loaded
function loadLibrary() {
  if (localStorage.getItem("library")) {
    Library = JSON.parse(localStorage.getItem("library"));
  }
}

// Adds new book to library and displays the new library
function submitForm() {
  form.style.display = "none";
  let newBook = new Book(title, author, pages, read);
  Library.push(newBook);
  storeLibrary();
  displayLibrary();
  form.reset();
}

// clears all book entries from table and then displays each book in library
function displayLibrary () {
  const books = document.querySelectorAll('.book');
  books.forEach((book) => {
    book.remove();
  });

  Library.forEach(item => displayBook(item));
}

// creates a new row in the table for the new book
function displayBook (item) {
  const table = document.getElementById('table');
  let row = table.insertRow(1);
  row.className = "book";

  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4);

  let delBtn = document.createElement('input');
  delBtn.type = 'button';
  delBtn.className = 'delete';
  delBtn.value = '\u00d7';
  cell0.appendChild(delBtn);
  delBtn.addEventListener('click', () => {
    Library.splice(Library.indexOf(item),1);
    storeLibrary();
    displayLibrary();
  });

  cell0.className = 'col0';
  cell1.textContent = item.title;
  cell2.textContent = item.author;
  cell3.textContent = item.pages;
  cell4.className = 'col4';
  
  let rdBtn = document.createElement('input');
  rdBtn.type = 'checkbox';
  item.read ? rdBtn.checked = true : rdBtn.checked = false;
  cell4.appendChild(rdBtn);
  rdBtn.addEventListener('change', () => {
    Library[Library.indexOf(item)].read = rdBtn.checked;
    storeLibrary();
    displayLibrary();
  });
}
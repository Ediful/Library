function openForm() {
  form.style.display = "block";
}

function closeForm() {
  form.style.display = "none";
}

function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read-status').checked = false;
}

function submitForm() {
  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let readStatus = document.getElementById('read-status');
  if(title.value.length === 0 || author.value.length === 0 || pages.value == '') {
    alert("Please fill empty fields");
    return;
  }
  let newBook = new Book(title.value, author.value, pages.value, readStatus.checked);
  Library.push(newBook);
  storeLibrary();
  closeForm();
  resetForm();
  newBook.display();
}

function deleteRow() {
  let i = this.parentNode.parentNode.rowIndex;
  table.deleteRow(i);
  Library.reverse().splice(i-1, 1);
  storeLibrary();
}

function toggleStatus() {
  // change status of Book on this row
  let i = this.parentNode.parentNode.rowIndex;
  Library[i-1].read = this.checked;
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.display = function() {
  let row = table.insertRow(1);
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4);

  let delBtn = document.createElement('span');
  delBtn.className = 'close delete';
  delBtn.textContent = '\u00d7';
  cell0.appendChild(delBtn);
  delBtn.addEventListener('click', deleteRow);

  cell1.textContent = this.title;
  cell2.textContent = this.author;
  cell3.textContent = this.pages;

  let rdBtn = document.createElement('input');
  rdBtn.type = 'checkbox';
  if (this.read === true) {
    rdBtn.checked = true;
  }
  else {
    rdBtn.checked = false;
  }
  cell4.appendChild(rdBtn);
  rdBtn.addEventListener('change', toggleStatus);
}

function storeLibrary() {
  localStorage.setItem("library", JSON.stringify(Library));
}

// load library when app is first loaded
function loadLibrary() {
  if (localStorage.getItem("library")) {
    Library = JSON.parse(localStorage.getItem("library"));
  }
}
// maybe use approach where entire table (excpet for top row maybe) is deleted and rebuild it
// use loop to create book object for each book in library 
// alter book.display to not actually use methods and just use a normal function
const table = document.querySelector('table');
const form = document.getElementById('modal');

let Library = [];
loadLibrary();

document.getElementById('add-book').addEventListener('click', openForm);

document.getElementById('close').addEventListener('click', closeForm);

document.getElementById('submit').addEventListener('click', submitForm);

window.onclick = function(event) {
  if (event.target == form) {
    closeForm();
  }
}

Library.forEach(book => {
  book.display();
});

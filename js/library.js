let myLibrary = [];
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
      return `The book is ${this.title} by ${this.author} ,${this.pages}, ${this.read}.`;
    }
  }
};

if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}


function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  //console.log('Adding ', book.info());
  count = myLibrary.push(book);
 
  localStorage.setItem('books', JSON.stringify(myLibrary));
  //console.log('myLibrary.length', myLibrary.length);
}
const add = document.getElementById('add');

add.onclick = function ( ) {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').value;
 // console.log('add.onclick', title);
  addBookToLibrary(title, author, pages, read);
  render();
  return;
};


function render() {
  localStorage.setItem('books', JSON.stringify(myLibrary));
  const bookList = document.querySelector('#table-body');
  bookList.textContent = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    const bookRow = document.createElement('tr');
    bookRow.classList.add('book-info');
    bookList.appendChild(bookRow);
    //  TITLE
    const bookTitle = document.createElement('td');
    bookTitle.textContent = myLibrary[i].title;
    bookRow.appendChild(bookTitle);
    //  AUTHOR
    const bookAuthor = document.createElement('td');
    bookAuthor.textContent = myLibrary[i].author;
    bookRow.appendChild(bookAuthor);
    //  PAGES
    const bookPages = document.createElement('td');
    bookPages.textContent = myLibrary[i].pages;
    bookRow.appendChild(bookPages);
    //  REVERT BUTTON
    const bookread = document.createElement('td');
    const readSymbol = document.createElement('button');
    bookread.textContent = myLibrary[i].read;
    readSymbol.textContent = "Revert";
    readSymbol.id = "revert";
    if (myLibrary[i].read === false) {
      readSymbol.classList.add('fas', 'fa-times');

    } else {
      readSymbol.classList.add('fas', 'fa-check');

    }
    bookread.appendChild(readSymbol);
    bookRow.appendChild(bookread);
    //  DELETE BUTTON
    const bookDelete = document.createElement('td');
    const deleteSymbol = document.createElement('button');

    deleteSymbol.textContent = "Delete";
    deleteSymbol.id = "delete";
    bookDelete.appendChild(deleteSymbol);
    bookRow.appendChild(bookDelete);
  }
}

function buttonClickListener() {
  document.addEventListener('click', (event) => {
    const {
      target
    } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === 'delete') {
      myLibrary.splice(tr, 1);
    } else if (target.classList.contains('fa-check') && target.id === "revert") {
      target.classList.remove('fa-check');
      target.classList.add('fa-times');
      myLibrary[tr].read = false;
    } else if (target.classList.contains('fa-times') && target.id === "revert") {
      target.classList.remove('fa-times');
      target.classList.add('fa-check');
      myLibrary[tr].read = true;
    }

    render();
  });
}

render();
buttonClickListener();
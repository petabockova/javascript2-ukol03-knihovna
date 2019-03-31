/*
  Třída pro knihovnu.

  Vlastnosti:
  - booklist: pole knih (objektů třídy Book)
  - lastBook: poslední přečtená kniha (objekt třídy Book)
  - currentBook: aktuálně čtená kniha (objekt třídy Book)
  - nextBook: příští kniha k přečtení (objekt třídy Book)
  - unreadBooks: počet nepřečtených knih

  Metody:
  - addBook(book): přidá knihu do knihovny
  - listAllBooks(): výpis všech knih v knihovně
  - startReadingNextBook(): začne čtení další knihy (tj. příští knihu přesune do aktuálně čtené knihy a do příští knihy vloží první nepřečtenou knihu v seznamu)
*/
export default class Library {

  constructor() {
    this.bookList = [];
    this.lastBook = null;
    this.currentBook = null;
    this.nextBook = null;
    this.unreadBooks = 0;
  }

  /* přidat knihu do knihovny */
  addBook(book) {
    this.bookList.push(book);

    if (!book.isRead) {
      this.unreadBooks++;

      if (this.nextBook === null) {
        this.nextBook = book;
      }
    }
  }

  /* výpis všech knih v knihovně */
  listAllBooks() {
    this.getListHTML(this.bookList);
  }

  /* začít číst další knihu */
  startReadingNextBook() {
    if (this.nextBook !== null) {
      // příští knihu ke čtení dáme do aktuálně čtené knihy
      this.finishCurrentBook();
      this.currentBook = this.nextBook;
      this.currentBook.isCurrent = true;
      this.nextBook = null;

      // do příští knihy ke čtení dáme první nepřečtenou knihu v seznamu
      for (let book of this.bookList) {
        if (!book.isRead && book !== this.currentBook) {
          this.nextBook = book;
          break;
        }
      }
    }
  }

  finishCurrentBook() {
    if (this.currentBook !== null) {
      this.currentBook.read();
      this.currentBook.isCurrent = false;
      this.lastBook = this.currentBook;
      this.currentBook = null;
      this.unreadBooks--;
    }
  }

  listUnreadBooks() {
    let unreadBooksList = bookList.filter(book => !book.isRead);
    console.log(unreadBooksList);
  }

  getListHTML(array) {
    let reducedList = array.reduce((acc, cur) => acc + cur.renderHTML(), "");
    let listHTML = document.getElementById("booklist");
    listHTML.innerHTML = reducedList;
  }

}
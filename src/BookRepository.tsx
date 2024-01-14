import { Book } from "./Model";
import SQLite from 'react-native-sqlite-storage';

export class BookRepository {
	db: SQLite.SQLiteDatabase;
	constructor() {
		this.db = SQLite.openDatabase(
		  {
			name: 'MainDB',
			location: 'default',
		  },
		  () => {
			this.db.transaction((tx) => {
			  tx.executeSql(
				`CREATE TABLE IF NOT EXISTS Books
				(id INTEGER PRIMARY KEY NOT NULL,
				title TEXT,
				author TEXT,
				description TEXT,
				genre TEXT,
				nrPages INTEGER,
				status TEXT)`,
				[],
				() => { console.log('Table initialized'); },
				error => { console.log(error); }
			  );
			});
		  },
		  error => { console.log(error); }
		);
	  }

	// getAllBooks(): Book[] {
	// 	return this.books;
	// }

	getAllBooks(): Promise<Book[]> {
		return new Promise((resolve, reject) => {
		  this.db.transaction((tx) => {
			tx.executeSql('SELECT * FROM Books', [], (tx, results) => {
			  let books: Book[] = [];
			  for (let i = 0; i < results.rows.length; i++) {
				books.push(results.rows.item(i));
			  }
			  resolve(books);
			});
		  });
		});
	  }

	getBookById(id: number): Promise<Book> {
		return new Promise((resolve, reject) => {
		  this.db.transaction((tx) => {
			tx.executeSql('SELECT * FROM Books WHERE id = ?', [id], (tx, results) => {
			  resolve(results.rows.item(0));
			});
		  });
		});
	  }

	// add(book: Book): number {
	// 	const lastBook = this.books[this.books.length - 1];
	// 	if (lastBook) {
	// 		book.id = lastBook.id + 1;
	// 	} else {
	// 		book.id = 1;
	// 	}
	// 	this.books.push(book);
	// 	return book.id;
	// }

	add(book: Book): Promise<number> {
		return new Promise((resolve, reject) => {
		  this.db.transaction((tx) => {
			tx.executeSql(
			  'INSERT INTO Books (title, author, description, genre, nrPages, status) VALUES (?, ?, ?, ?, ?, ?)',
			  [book.title, book.author, book.description, book.genre, book.nrPages, book.status],
			  (tx, results) => {
				resolve(results.insertId);
			  }
			);
		  });
		});
	  }

	addWithId(book: Book): Promise<number> {
		return new Promise((resolve, reject) => {
		  this.db.transaction((tx) => {
			tx.executeSql(
			  'INSERT INTO Books (id, title, author, description, genre, nrPages, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
			  [book.id, book.title, book.author, book.description, book.genre, book.nrPages, book.status],
			  (tx, results) => {
				resolve(results.insertId);
			  }
			);
		  });
		});
	  }

	// update(book: Book): void {
	// 	const index = this.books.findIndex((b) => b.id === book.id);
	// 	this.books[index] = book;
	// }

	update(book: Book): Promise<void> {
		return new Promise((resolve, reject) => {
		  this.db.transaction((tx) => {
			tx.executeSql(
			  'UPDATE Books SET title = ?, author = ?, description = ?, genre = ?, nrPages = ?, status = ? WHERE id = ?',
			  [book.title, book.author, book.description, book.genre, book.nrPages, book.status, book.id],
			  (tx, results) => {
				resolve();
			  }
			);
		  });
		});
	  }

	// delete(id: number): void {
	// 	this.books = this.books.filter((b) => b.id !== id);
	// }

	delete(id: number): Promise<void> {
		return new Promise((resolve, reject) => {
		  this.db.transaction((tx) => {
			tx.executeSql(
			  'DELETE FROM Books WHERE id = ?',
			  [id],
			  (tx, results) => {
				resolve();
			  }
			);
		  });
		});
	  }

	async reset(books: Book[]): Promise<void> {
		const oldBooks = await this.getAllBooks();
		for (const book of oldBooks) {
			await this.delete(book.id);
		}
		for (const book of books) {
			await this.addWithId(book);
		}
	}
}

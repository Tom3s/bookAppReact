import { Book } from "./Model";

export class BookRepository {
	constructor(
		private books: Book[],
	) {}

	getAllBooks(): Book[] {
		return this.books;
	}

	add(book: Book): number {
		const lastBook = this.books[this.books.length - 1];
		if (lastBook) {
			book.id = lastBook.id + 1;
		} else {
			book.id = 1;
		}
		this.books.push(book);
		return book.id;
	}

	update(book: Book): void {
		const index = this.books.findIndex((b) => b.id === book.id);
		this.books[index] = book;
	}

	delete(id: number): void {
		this.books = this.books.filter((b) => b.id !== id);
	}
}

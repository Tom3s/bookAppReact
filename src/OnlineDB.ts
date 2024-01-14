import { Book } from "./Model";

export class OnlineDB {
	private address = "http://192.168.1.100:3000/api/";

	getAllBooks(): Promise<Book[]> {
		return fetch(this.address + "books")
			.then(response => response.json())
			.then(json => json as Book[]);
	}

	getBookById(id: number): Promise<Book> {
		return fetch(this.address + "books/" + id)
			.then(response => response.json())
			.then(json => json as Book);
	}

	add(book: Book): Promise<number> {
		return fetch(this.address + "books", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(book)
		})
			.then(response => response.json())
			.then(json => json as number);
	}

	update(book: Book): Promise<void> {
		return fetch(this.address + "books/", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(book)
		})
			.then(response => response.json())
			.then(json => json as void);
	}

	delete(id: number): Promise<void> {
		return fetch(this.address + "books/" + id, {
			method: "DELETE"
		})
			.then(response => response.json())
			.then(json => json as void);
	}
}


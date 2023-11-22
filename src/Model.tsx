export enum Genre {
	Action = "Action",
	Adventure = "Adventure",
	Comedy = "Comedy",
	Drama = "Drama",
	Fantasy = "Fantasy",
	Horror = "Horror",
	Mystery = "Mystery",
	Romance = "Romance",
	Thriller = "Thriller",
	Western = "Western",
	ScienceFiction = "Science Fiction",
	Dystopian = "Dystopian",
	Other = "Other",
}

export enum BookStatus {
	Read = "Read",
	Reading = "Reading",
	Unread = "Unread",
}

export interface Book {
	id: number;
	title: string;
	author: string;
	description: string;
	genre: Genre;
	nrPages: number;
	status: BookStatus;
}
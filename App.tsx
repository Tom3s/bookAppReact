import { Fragment, useEffect, useState } from "react";
import { Book, BookStatus, Genre } from "./src/Model";
import { Alert, Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListView } from "./src/ListView";
import { CreateView } from "./src/CreateView";
import { UpdateView } from "./src/UpdateView";
import { BookRepository } from "./src/BookRepository";

interface AppProps { }
const initialBooks: Book[] = [
	{
		id: 1,
		title: "To Kill a Mockingbird",
		author: "Harper Lee",
		description: "A classic novel exploring racial injustice and moral growth in the American South.",
		genre: Genre.Drama,
		nrPages: 281,
		status: BookStatus.Read,
	},
	{
		id: 2,
		title: "1984",
		author: "George Orwell",
		description: "A dystopian novel depicting a totalitarian regime and the consequences of extreme political ideologies.",
		genre: Genre.Dystopian,
		nrPages: 328,
		status: BookStatus.Read,
	},
	{
		id: 3,
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
		description: "A novel set in the Roaring Twenties, exploring themes of wealth, love, and the American Dream.",
		genre: Genre.Romance,
		nrPages: 180,
		status: BookStatus.Read,
	},
	{
		id: 4,
		title: "Pride and Prejudice",
		author: "Jane Austen",
		description: "A classic novel exploring love, class, and social expectations in early 19th-century England.",
		genre: Genre.Romance,
		nrPages: 279,
		status: BookStatus.Read,
	},
	{
		id: 5,
		title: "The Catcher in the Rye",
		author: "J.D. Salinger",
		description: "A novel following the experiences of a teenager in New York City, exploring themes of alienation and identity.",
		genre: Genre.Drama,
		nrPages: 277,
		status: BookStatus.Read,
	},
	{
		id: 6,
		title: "The Girl with the Dragon Tattoo",
		author: "Stieg Larsson",
		description: "A mystery thriller novel featuring investigative journalist Mikael Blomkvist and hacker Lisbeth Salander.",
		genre: Genre.Mystery,
		nrPages: 590,
		status: BookStatus.Reading,
	},
	{
		id: 7,
		title: "The Hunger Games",
		author: "Suzanne Collins",
		description: "A dystopian novel set in a post-apocalyptic world where young people are forced to participate in a televised death match.",
		genre: Genre.Dystopian,
		nrPages: 374,
		status: BookStatus.Unread,
	},
	{
		id: 8,
		title: "The Da Vinci Code",
		author: "Dan Brown",
		description: "A mystery thriller novel that follows symbologist Robert Langdon in a quest for hidden secrets.",
		genre: Genre.Mystery,
		nrPages: 454,
		status: BookStatus.Reading,
	},
	{
		id: 9,
		title: "The Shining",
		author: "Stephen King",
		description: "A horror novel that tells the story of a family's winter stay at an isolated hotel, haunted by supernatural forces.",
		genre: Genre.Horror,
		nrPages: 447,
		status: BookStatus.Unread,
	},
	{
		id: 10,
		title: "The Martian",
		author: "Andy Weir",
		description: "A science fiction novel about an astronaut stranded on Mars and his struggle for survival.",
		genre: Genre.ScienceFiction,
		nrPages: 369,
		status: BookStatus.Unread,
	},
	{
		id: 11,
		title: "Gone Girl",
		author: "Gillian Flynn",
		description: "A psychological thriller novel that explores the complexities of a marriage and a mysterious disappearance.",
		genre: Genre.Thriller,
		nrPages: 415,
		status: BookStatus.Unread,
	},
	{
		id: 12,
		title: "Jurassic Park",
		author: "Michael Crichton",
		description: "A science fiction novel about the disastrous attempt to create a theme park with cloned dinosaurs.",
		genre: Genre.ScienceFiction,
		nrPages: 448,
		status: BookStatus.Unread,
	},
	{
		id: 13,
		title: "The Road",
		author: "Cormac McCarthy",
		description: "A post-apocalyptic novel following a father and son's journey through a desolate landscape.",
		genre: Genre.Dystopian,
		nrPages: 241,
		status: BookStatus.Unread,
	},
	{
		id: 14,
		title: "The Girl on the Train",
		author: "Paula Hawkins",
		description: "A psychological thriller novel centered around the mysterious disappearance of a woman.",
		genre: Genre.Thriller,
		nrPages: 336,
		status: BookStatus.Unread,
	},
	{
		id: 15,
		title: "The Alchemist",
		author: "Paulo Coelho",
		description: "A philosophical novel following the journey of a young shepherd as he pursues his dreams.",
		genre: Genre.Adventure,
		nrPages: 163,
		status: BookStatus.Read,
	},
];

const bookRepo = new BookRepository();

const App: React.FC<AppProps> = () => {


	const [books, setBooks] = useState<Book[]>([]);
	const [currentBook, setCurrentBook] = useState<Book | null>(null);
	const [editing, setEditing] = useState<number | null>(null);
	const [creating, setCreating] = useState<boolean>(false);

	useEffect(() => {
		const fetchBooks = async () => {
			const allBooks = await bookRepo.getAllBooks();
			setBooks(allBooks);
		};

		fetchBooks();
	}, []);

	const handleCreate = async (newBook: Book) => {
		await bookRepo.add(newBook);
		const allBooks = await bookRepo.getAllBooks();
		setBooks(allBooks);
		// setCurrentBook(null);
		setCreating(false);
		setEditing(null);
	};

	const handleUpdate = async (updatedBook: Book) => {
		await bookRepo.update(updatedBook);
		const allBooks = await bookRepo.getAllBooks();
		setBooks(allBooks);
		// setCurrentBook(null);
		setCreating(false);
		setEditing(null);
	};

	const handleDelete = async (id: number) => {
		Alert.alert(
			'Confirm delete',
			'Are you sure you want to delete this book?',
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'Delete',
					onPress: async () => {
						await bookRepo.delete(id);
						const allBooks = await bookRepo.getAllBooks();
						setBooks(allBooks);
						// setCurrentBook(null);
						setCreating(false);
						setEditing(null);
					}
				}
			],
			{ cancelable: true }
		);
	};

	return (
		<View style={styles.container}>
			{
				editing === null && creating === false &&
				<Fragment>
					<ListView
						data={books}
						onPressItem={(item) => {
							setEditing(item.id)
							setCurrentBook(item)
							setCreating(false)
						}}
						onDeleteItem={(id) => handleDelete(id)}
					/>
					<Button
						title="Create"
						onPress={() => {
							setCreating(true);
							setEditing(null);
						}}
					/>
				</Fragment>
			}
			{editing === null && creating && (
				<CreateView onSubmit={handleCreate} onCancel={() => {setCreating(false); setEditing(null)}} />
			)}
			{!creating && editing !== null && currentBook !== null && (
				<UpdateView item={currentBook} onSubmit={handleUpdate} onCancel={() => {setCreating(false); setEditing(null)}} />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		padding: 16,
	},
	createButton: {
		position: 'absolute',
		bottom: 16,
		right: 16,
		// zIndex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: 'skyblue',
	},
});

export default App;
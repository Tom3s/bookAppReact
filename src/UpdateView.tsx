import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { Book, BookStatus, Genre } from './Model';
import { Picker } from '@react-native-picker/picker';

interface UpdateViewProps {
	item: Book;
	onCancel: () => void;
	onSubmit: (newBook: Book) => void;
}

export const UpdateView: React.FC<UpdateViewProps> = ({ item, onSubmit, onCancel }) => {

	const [title, setTitle] = useState<string>(item.title);
	const [author, setAuthor] = useState<string>(item.author);
	const [description, setDescription] = useState<string>(item.description);
	const [genre, setGenre] = useState<Genre>(item.genre);
	const [nrPages, setNrPages] = useState<number>(item.nrPages);
	const [status, setStatus] = useState<BookStatus>(item.status);


	function fieldsAreEmpty() {
		return title === "" ||
			author === "" ||
			description === "" ||
			genre === Genre.Other ||
			nrPages === 0
	}

	const handleSubmit = () => {
		if (fieldsAreEmpty()) {
			return;
		}

		onSubmit({
			id: item.id,
			title: title,
			author: author,
			description: description,
			genre: genre,
			nrPages: nrPages,
			status: status,
		});
	};

	return (
		<View>
			<Text>Title:</Text>
			<TextInput value={title} onChangeText={(text) => setTitle(text)} />

			<Text>Author:</Text>
			<TextInput value={author} onChangeText={(text) => setAuthor(text)} />

			<Text>Description:</Text>
			<TextInput value={description} onChangeText={(text) => setDescription(text)} />

			<Text>Genre:</Text>
			<Picker
				selectedValue={genre}
				onValueChange={(itemValue: Genre) => setGenre(itemValue)}
			>
				{
					(Object.keys(Genre) as Array<keyof typeof Genre>).map((genre) => {
						return <Picker.Item key={genre} label={genre} value={genre} />
					})
				}
			</Picker>

			<Text>Number of Pages:</Text>
			<TextInput
				value={nrPages.toString()}
				onChangeText={(text) => setNrPages(parseInt(text))}
				keyboardType="numeric"
			/>

			<Text>Status:</Text>
			<Picker
				selectedValue={status}
				onValueChange={(itemValue: BookStatus) => setStatus(itemValue)}
			>
				{
					(Object.keys(BookStatus) as Array<keyof typeof BookStatus>).map((status) => {
						return <Picker.Item key={status} label={status} value={status} />
					})
				}
			</Picker>

			<Button title="Update Book" onPress={handleSubmit} />
			<Button title="Cancel" onPress={onCancel} />
		</View>
	);
};

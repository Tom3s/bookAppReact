import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { Book, BookStatus, Genre } from './Model';
import { Picker } from '@react-native-picker/picker';

interface CreateViewProps {
	onCancel: () => void;
	onSubmit: (newBook: Book) => void;
}

export const CreateView: React.FC<CreateViewProps> = ({ onSubmit, onCancel }) => {

	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [genre, setGenre] = useState<Genre>(Genre.Other);
	const [nrPages, setNrPages] = useState<number>(0);
	const [status, setStatus] = useState<BookStatus>(BookStatus.Unread);


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
			id: 0,
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
				value={isNaN(nrPages) ? "" : nrPages.toString()}
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

			<Button title="Add Book" onPress={handleSubmit} />
			<Button title="Cancel" onPress={onCancel} />
		</View>
	);
};

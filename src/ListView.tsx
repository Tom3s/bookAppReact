import React from 'react';
import { Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { Book } from './Model';



interface ListViewProps {
	data: Array<Book>;
	onPressItem: (item: Book) => void;
	onDeleteItem: (id: number) => void;
}

export const ListView: React.FC<ListViewProps> = ({ data, onPressItem, onDeleteItem }) => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => (
				<TouchableOpacity
					style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}
				>
					<TouchableOpacity
						onPress={() => onPressItem(item)}
					>
						<Text>{item.title}</Text>
						<Text>by: {item.author}</Text>
						<Text>{item.genre} - Pages: {item.nrPages}</Text>
						<Text>{item.status}</Text>
					</TouchableOpacity>
					<Button title="Delete" onPress={() => onDeleteItem(item.id)} />

				</TouchableOpacity>
			)}
		/>
	);
};

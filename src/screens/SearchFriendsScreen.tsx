import React from 'react'
import { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { firestore } from '../firebase';
import { User } from '../contexts/userContext';

interface SearchFriendsScreenProps {

}

export const SearchFriendsScreen: React.FC<SearchFriendsScreenProps> = ({ }) => {
	const [username, setUsername] = useState("")
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState<boolean>(false)


	const searchUsers = async () => {
		console.log(username)
		setLoading(true)
		if (!username.trim()) {

		} else {
			const end = username.trim().replace(
				/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1),
			);

			const res = await getDocs(
				query(collection(firestore, "users"), where("username", ">=", username.trim()), where("username", "<", end))
			)
			setUsers(res.docs.map((doc) => doc.data() as User))
		}
		setLoading(false)
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<View style={styles.inputWrapper}>
					<Ionicons name="search" size={24} color="#555" />
					<TextInput
						onSubmitEditing={searchUsers}
						style={styles.input}
						placeholder="Enter username"
						value={username}
						onChange={e => setUsername(e.nativeEvent.text)}
					/>
				</View>
			</View>
			{loading && <Text>Loading...</Text>}
			<ScrollView>

				{users.map(({ username }, idx) => (
					<View key={idx}>
						<Text>{username}</Text>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 40,
		backgroundColor: "#fff",
		height: "100%",
	},
	inputWrapper: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		width: "100%",
		marginTop: 20,
		paddingVertical: 6,
		paddingHorizontal: 10,
		flexDirection: "row"
	},
	input: {
		fontSize: 20,
		paddingLeft: 10,
		flex: 1
	},
	inputContainer: {
		borderBottomColor: "#000",
		borderBottomWidth: 1,
		paddingBottom: 10,
		paddingHorizontal: 10
	}
})
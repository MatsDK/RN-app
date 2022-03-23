import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from '../firebase';
import { signOut, getAdditionalUserInfo, onAuthStateChanged, User } from "firebase/auth"

interface HomeScreenProps {

}

export const HomeScreen: React.FC<HomeScreenProps> = (props: any) => {
	const [user, setUser] = useState<null | User>(null)

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
			} else {
				props.navigation.navigate("Login")
			}
		});
		return () => { }
	}, [])

	const logout = async () => {
		try {
			await signOut(auth)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<View style={styles.container}>
			<Text>Home</Text>
			<Text>{user?.email}</Text>
			<TouchableOpacity onPress={logout}>
				<Text style={styles.button}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingTop: 50,
	},
	button: {
		backgroundColor: "#000",
		padding: 5,
		color: "#fff",
		borderRadius: 6,
		overflow: "hidden",
		fontSize: 20
	}
})
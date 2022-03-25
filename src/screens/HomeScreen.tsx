import { signOut } from "firebase/auth";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUserState } from '../contexts/userContext';
import { auth } from '../firebase';

interface HomeScreenProps {

}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
	const { user } = useUserState()

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
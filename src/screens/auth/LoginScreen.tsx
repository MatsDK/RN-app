import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authScreenNavigationType } from '../../contexts/userContext';
import { auth } from "../../firebase";

interface LoginScreenProps {

}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
	const navigation = useNavigation<authScreenNavigationType>()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const login = async () => {
		try {
			const credential = await signInWithEmailAndPassword(auth, email, password)
			console.log(credential)

		} catch (err) {
			console.log(err)
		}
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={"padding"}
		>
			<Text style={styles.title}>Login</Text>
			<View style={styles.inputsContainer}>
				<View style={styles.inputWrapper}>
					<MaterialCommunityIcons style={styles.icon} name="email-outline" size={26} color="#333" />
					<TextInput
						style={styles.input}
						placeholder="Email"
						value={email}
						onChange={text => setEmail(text.nativeEvent.text)}
					/>
				</View>
				<View style={styles.inputWrapper}>
					<MaterialCommunityIcons style={styles.icon} name="form-textbox-password" size={26} color="#333" />
					<TextInput
						style={styles.input}
						placeholder="Password"
						secureTextEntry
						value={password}
						onChange={text => setPassword(text.nativeEvent.text)}
					/>
				</View>
				<TouchableOpacity onPress={login}>
					<Text style={styles.button}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
					<Text style={styles.createAccountButton}>Create an account</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 100,
		display: "flex",
		justifyContent: "center",
		padding: 40
	},
	inputsContainer: {
		display: "flex",
		flexDirection: "column",
	},
	title: {
		fontSize: 35,
		fontWeight: "500",
		marginBottom: 30
	},
	buttonContainer: {
		display: "flex",
		alignItems: "flex-start"
	},
	button: {
		marginTop: 15,
		backgroundColor: "#000",
		paddingVertical: 5,
		textAlign: "center",
		color: "#fff",
		borderRadius: 6,
		overflow: "hidden",
		fontSize: 20,
	},
	inputWrapper: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		width: "100%",
		marginVertical: 5,
		paddingVertical: 6,
		paddingHorizontal: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	input: {
		fontSize: 20,
		flex: 1
	},
	icon: {
		marginRight: 10
	},
	createAccountButton: {
		marginTop: 15,
		textAlign: "center",
		fontSize: 16
	}
})

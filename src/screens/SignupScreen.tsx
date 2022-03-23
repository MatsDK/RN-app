import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { auth } from '../firebase'

interface SignupScreenProps {

}

export const SignupScreen: React.FC<SignupScreenProps> = (props: any) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const signUp = async () => {
		try {
			const credential = await createUserWithEmailAndPassword(auth, email, password)
			console.log(credential)

			props.navigation.navigate("Login")

		} catch (err) {
			console.log(err)
		}
	}

	return (
		<KeyboardAvoidingView>

			<View>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChange={text => setEmail(text.nativeEvent.text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					value={password}
					onChange={text => setPassword(text.nativeEvent.text)}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={signUp}>
					<Text style={styles.button}>Login</Text>
				</TouchableOpacity>
			</View>

		</KeyboardAvoidingView>

	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 150,
		maxWidth: "60%",
		marginLeft: 50
	},
	buttonContainer: {
		display: "flex",
		alignItems: "flex-start"
	},
	button: {
		backgroundColor: "#000",
		padding: 5,
		color: "#fff",
		borderRadius: 6,
		overflow: "hidden"
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		width: "100%",
		fontSize: 18,
		margin: 4,
		padding: 2
	}
})
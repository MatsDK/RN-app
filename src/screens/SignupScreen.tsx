import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native"
import { auth } from '../firebase'
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '../../App'

interface SignupScreenProps {

}

export type authScreenNavigationType = StackNavigationProp<AuthStackParamList, "SignUp">

export const SignupScreen: React.FC<SignupScreenProps> = () => {
	const navigation = useNavigation<authScreenNavigationType>()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")

	const signUp = async () => {
		try {
			const credential = await createUserWithEmailAndPassword(auth, email, password)
			console.log(credential)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<KeyboardAvoidingView style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginButton}>
				<MaterialCommunityIcons style={styles.icon} name="arrow-left" size={26} color="#333" />
				<Text style={styles.loginButtonText}>
					Login
				</Text>
			</TouchableOpacity>
			<Text style={styles.title}>Sign Up</Text>
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
					<Feather style={styles.icon} name="user" size={26} color="#333" />
					<TextInput
						style={styles.input}
						placeholder="Username"
						value={username}
						onChange={text => setUsername(text.nativeEvent.text)}
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
				<TouchableOpacity onPress={signUp}>
					<Text style={styles.button}>Sign Up</Text>
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
	title: {
		fontSize: 35,
		fontWeight: "500",
		marginBottom: 30
	},
	inputsContainer: {
		display: "flex",
		flexDirection: "column",
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
		// paddingHorizontal: 15,
		color: "#fff",
		borderRadius: 6,
		overflow: "hidden",
		fontSize: 20,
	},
	loginButton: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		// marginBottom: 10,
		paddingVertical: 10
	},
	loginButtonText: {
		fontSize: 18,
		padding: 4,
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
	}
})
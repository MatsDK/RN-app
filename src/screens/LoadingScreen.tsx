import { View, Text, StyleSheet } from "react-native"

interface LoadingScreenProps { }

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
	return (
		<View style={styles.container}>
			<Text>Loading</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
})
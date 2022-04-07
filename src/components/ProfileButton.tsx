import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity } from "react-native"
import { HomeStackParamList } from '../../App';
import { useUserState } from '../contexts/userContext';

interface ProfileButtonProps {

}

export type homeScreenNavigationType = StackNavigationProp<HomeStackParamList, "Home">

export const ProfileButton: React.FC<ProfileButtonProps> = ({ }) => {
	const { user } = useUserState()
	const navigation = useNavigation<homeScreenNavigationType>()

	if (!user) return <View></View>
	return (
		<TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Profile", { userId: user.id })}>
			<Text>{user.username}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: "100%",
		display: "flex",
		justifyContent: "center"
	}
})
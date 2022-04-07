import { RouteProp, StackRouterOptions, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { HomeStackParamList } from '../../App';
import { StyleSheet } from 'react-native';
import { useUserState } from '../contexts/userContext';

interface ProfileScreenProps {

}

export type profileScreenNavigationType = StackNavigationProp<HomeStackParamList, "Profile">
export type profileScreenRouteType = RouteProp<HomeStackParamList, "Profile">

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ }) => {
	const userState = useUserState()
	const navigation = useNavigation<profileScreenNavigationType>()
	const { params: { userId } } = useRoute<profileScreenRouteType>()

	const isCurrentUser = userState.user?.id === userId;

	return (
		<View style={styles.container}>
			<Text>Profile: {userId}</Text>
			<Text>{isCurrentUser && "Me"}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		height: "100%"
	}
})
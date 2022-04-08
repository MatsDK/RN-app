import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HomeStackParamList } from '../../App';
import { UserPostsContainer } from '../components/UserPostsContainer';
import { User, useUserState } from '../contexts/userContext';
import { firestore } from '../firebase';

interface ProfileScreenProps {

}

export type profileScreenNavigationType = StackNavigationProp<HomeStackParamList, "Profile">
export type profileScreenRouteType = RouteProp<HomeStackParamList, "Profile">

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ }) => {
	const userState = useUserState()
	// const navigation = useNavigation<profileScreenNavigationType>()
	const { params: { userId } } = useRoute<profileScreenRouteType>()


	const [user, setUser] = useState<User | null>(null)
	const [postsCount, setPostsCount] = useState<number>(0)

	const isCurrentUser = userState.user?.id === userId;

	useEffect(() => {
		; (async () => {
			const user = (await getDoc(doc(firestore, "users", userId))).data()
			user && setUser(user as User)
		})()
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.userInfoContainer}>
				<Text style={styles.username}>{user?.username}</Text>
				<Text>{isCurrentUser && "You"}</Text>
				<View style={styles.statsContainer}>
					<View style={styles.statItem}>
						<Text style={styles.number}>0</Text>
						<Text style={styles.label}>Followers</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.number}>0</Text>
						<Text style={styles.label}>Following</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.number}>{postsCount}</Text>
						<Text style={styles.label}>Posts</Text>
					</View>
				</View>
				<UserPostsContainer userId={userId} setPostsCount={setPostsCount} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		paddingTop: 40,
		height: "100%"
	},
	username: {
		fontSize: 28,
		fontWeight: "600"
	},
	userInfoContainer: {
		paddingTop: 50,
		alignItems: "center"
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "100%",
		marginTop: 20
	},
	statItem: {
		alignItems: "center",
		flex: 1
	},
	number: {
		fontWeight: "700",
		fontSize: 18
	},
	label: {
		fontSize: 16,
		fontWeight: "300"
	}
})
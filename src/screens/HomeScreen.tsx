import { signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PostsItem } from "../components/Post";
import { homeScreenNavigationType, ProfileButton } from "../components/ProfileButton";
import { User, useUserState } from '../contexts/userContext';
import { auth, firestore } from '../firebase';
import { Post } from "./NewPostScreen";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


interface HomeScreenProps {

}


export const HomeScreen: React.FC<HomeScreenProps> = () => {
	const { user } = useUserState()
	const navigation = useNavigation<homeScreenNavigationType>()

	const [posts, setPosts] = useState<Post[]>([])
	const [refreshing, setRefresing] = useState<boolean>(false)

	const logout = async () => {
		try {
			await signOut(auth)
		} catch (err) {
			console.log(err)
		}
	}

	const fetchPosts = async () => {
		if (!user) return
		const postsRes = await getDocs(query(collection(firestore, "posts"), orderBy("timestamp", "desc"), where("userId", "==", user.uid)))
		const posts = postsRes.docs.map((doc) => doc.data() as Post);

		const usersRes = await getDocs(query(collection(firestore, "users"), where("id", "in", posts.map(({ userId }) => userId))))
		const users = usersRes.docs.map((doc) => doc.data() as User)

		setPosts(posts.map((post) => {
			const user = users.find(({ id }) => id === post.userId)
			return user ? { ...post, user } : post
		}))
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	useEffect(() => {
		if (refreshing) {
			fetchPosts().then(() => setRefresing(false))
		}
	}, [refreshing])

	if (!user) return <View><Text>test</Text></View>

	return (
		<View style={styles.container} >
			<View style={styles.header}>
				<Text style={styles.title}>Posts</Text>
				<View style={styles.headerRight}>
					<TouchableOpacity onPress={() => navigation.navigate("SearchFriends")}>
						<Ionicons style={{ marginRight: 10 }} name="search" size={24} color="black" />
					</TouchableOpacity>
					<ProfileButton />
				</View>
			</View>
			<TouchableOpacity onPress={logout}>
				<Text style={styles.button}>Logout</Text>
			</TouchableOpacity>
			<ScrollView
				style={{ paddingBottom: 10 }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => setRefresing(true)}
					/>
				}
			>
				{!!posts.length &&
					posts.map((post, idx) => <PostsItem post={post} key={idx} />)}
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		height: "100%",
		paddingTop: 40

	},
	header: {
		paddingHorizontal: 10,
		height: 40,
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	title: {
		fontSize: 35,
		fontWeight: "500",
		flex: 1
	},
	headerRight: {
		flexDirection: "row",
		alignItems: "center"
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
import { signOut } from "firebase/auth";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUserState } from '../contexts/userContext';
import { auth, firestore, storageRef } from '../firebase';
import { Post } from "./NewPostScreen";

interface HomeScreenProps {

}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
	const { user } = useUserState()
	const [posts, setPosts] = useState<Post[]>([])

	const logout = async () => {
		try {
			await signOut(auth)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		; (async () => {
			const res = await getDocs(collection(firestore, "posts"))
			setPosts(res.docs.map((doc) => doc.data() as Post))
		})()
	}, [])

	return (
		<View style={styles.container}>
			<Text>Home</Text>
			{/* <Text>{user?.username}</Text> */}
			<TouchableOpacity onPress={logout}>
				<Text style={styles.button}>Logout</Text>
			</TouchableOpacity>
			{posts.map((post, idx) => <PostsItem post={post} key={idx} />)}
		</View>
	);
}

const PostsItem: React.FC<{ post: Post }> = ({ post: { images, lon, lat, caption, timestamp } }) => {
	const [uri, setUri] = useState("")

	useEffect(() => {
		getDownloadURL(storageRef(images[0])).then((res) => {
			setUri(res)
		})
	}, [])

	return (
		<View>
			<Text>Lat: {lat}, long: {lon}</Text>
			<Text>{caption}, {moment(timestamp).fromNow()}</Text>
			{!!uri &&
				<Image
					source={{
						uri,
					}}
					style={{
						height: 200,
						width: 300,
					}}

				/>
			}
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingTop: 50,
		backgroundColor: "#fff",
		height: "100%"
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
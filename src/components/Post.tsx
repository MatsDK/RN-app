import { getDownloadURL } from "firebase/storage"
import { View, Image, Text } from "react-native"
import moment from "moment"
import React, { useState, useEffect } from "react"
import { storageRef } from "../firebase"
import { Post } from "../screens/NewPostScreen"
import { StyleSheet } from "react-native"

interface PostItemProps {
	post: Post
}

export const PostsItem: React.FC<PostItemProps> = ({ post: { images, lon, lat, caption, timestamp, user } }) => {
	const [uri, setUri] = useState("")

	useEffect(() => {
		getDownloadURL(storageRef(images[0])).then((res) => {
			setUri(res)
		})
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.postHeader}>
				<Text style={styles.username}>{user?.username}</Text>
				<Text style={styles.location}>Lat: {lat}, long: {lon}</Text>
			</View>
			{!!uri &&
				<Image
					source={{
						uri,
					}}
					style={{
						// height: 200,
						aspectRatio: 1,
						width: "100%",
					}}
				/>
			}
			<View style={styles.postBottom}>
				{!!caption && <Text style={styles.caption}>{caption} </Text>}
				<Text style={styles.timestamp}>{moment(timestamp).fromNow()}</Text>
			</View>

		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginTop: 10,
		// borderBottomWidth: 1,
		borderBottomColor: "#eee"
	},
	postHeader: {
		width: "100%",
		height: 40,
		paddingHorizontal: 10,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly"
	},
	username: {
		fontWeight: "600",
		fontSize: 17
	},
	location: {
		fontSize: 13,
		fontWeight: "300",
		color: "#555"
	},
	postBottom: {
		display: "flex",
		paddingHorizontal: 10,
		paddingVertical: 5
	},
	caption: {
		fontSize: 16,
	},
	timestamp: {
		fontSize: 13,
		fontWeight: "300",
		color: "#555",
		textAlign: "right"
	}
})

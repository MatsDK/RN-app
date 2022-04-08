import React, { useState } from 'react'
import { Post as PostType } from '../screens/NewPostScreen'
import { View, ScrollView, StyleSheet } from "react-native"
import { useEffect } from 'react'
import { getDocs, query, collection, orderBy, where } from '@firebase/firestore'
import { firestore } from '../firebase'
import { PostsItem } from './Post'

interface UserPostsContainerProps {
	userId: string,
	setPostsCount: React.Dispatch<React.SetStateAction<number>>
}

export const UserPostsContainer: React.FC<UserPostsContainerProps> = ({ userId, setPostsCount }) => {
	const [posts, setPosts] = useState<PostType[]>([])

	useEffect(() => {
		; (async () => {
			const postsRes = (
				await getDocs(query(collection(firestore, "posts"), orderBy("timestamp", "desc"), where("userId", "==", userId)))
			).docs.map(post => post.data() as PostType)

			setPosts(postsRes)
			setPostsCount(postsRes.length)
		})()
	}, [userId])

	return (
		<View style={styles.postsContainer}>
			<ScrollView>
				{posts.map((post, idx) => {
					return <PostsItem key={idx} post={post} />
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	postsContainer: {
		borderTopColor: "#000",
		borderTopWidth: 1,
		marginTop: 40,
		paddingBottom: 222
	}
})
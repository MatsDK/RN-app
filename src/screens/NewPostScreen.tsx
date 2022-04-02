import * as Location from "expo-location";
import { v4 } from "uuid"
import { setDoc, doc, addDoc, CollectionReference, collection } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PictureOverlay } from '../components/PictureOverlay';
import { firestore, storageRef } from '../firebase';
import { usePictures } from '../hooks/usePictures';

interface NewPostScreenProps {

}

export const NewPostScreen: React.FC<NewPostScreenProps> = ({ }) => {
	const [pictures] = usePictures()
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [pictureOverlayIdx, setPictureOverlayIdx] = useState<null | number>(null)

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log("Permission not granted")
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);


	const upload = async () => {
		if (pictures.length === 0 || !location) return null

		const imageIds: string[] = []
		for (const { uri } of pictures) imageIds.push(await uploadImage(uri))

		await addDoc(collection(firestore, "posts"),
			{
				images: imageIds,
				lon: location.coords.longitude,
				lat: location.coords.latitude
			}
		)
	}

	const uploadImage = async (uri: string) => {
		const blob: Blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", uri, true);
			xhr.send(null);
		});

		const id = new Date().toISOString()
		await uploadBytesResumable(storageRef(`memo-eab94.appspot.com/${id}`), blob)

		return id
	}

	return (
		<View style={styles.container}>
			{pictureOverlayIdx != null &&
				<PictureOverlay hide={() => setPictureOverlayIdx(null)} pictureIdx={pictureOverlayIdx} />
			}
			<View style={{ padding: 40 }}>
				<Text style={styles.title}>New Post</Text>
				<ScrollView horizontal style={styles.picturesContainer}>
					{pictures.map(({ uri, height, width }, idx) => {
						return (
							<TouchableOpacity onPress={() => setPictureOverlayIdx(idx)}>
								<Image
									key={uri}
									source={{
										uri,
									}}
									style={{
										aspectRatio: width / height,
										height: 160,
										marginRight: 10
									}}
								/>
							</TouchableOpacity>
						)
					})}
				</ScrollView>
				<Text>{JSON.stringify(location)}</Text>
				<Button title="Upload" onPress={upload} />
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: "#fff"
	},
	title: {
		fontWeight: "500",
		fontSize: 35
	},
	picturesContainer: {
	}
})

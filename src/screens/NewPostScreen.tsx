import * as Location from "expo-location";
import { addDoc, collection } from "firebase/firestore";
import { uploadBytes, uploadBytesResumable } from "firebase/storage";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { PictureOverlay } from '../components/PictureOverlay';
import { User, useUserState } from "../contexts/userContext";
import { firestore, storageRef } from '../firebase';
import { usePictures } from '../hooks/usePictures';

interface NewPostScreenProps {

}

export interface Post {
	images: string[],
	lon: number,
	lat: number,
	caption: string | null,
	timestamp: string,
	userId: string,
	user?: User,
	locationName: string
}

export const NewPostScreen: React.FC<NewPostScreenProps> = ({ }) => {
	const [pictures] = usePictures()
	const { user } = useUserState()
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [locationName, setLocationName] = useState<string>("");
	const [pictureOverlayIdx, setPictureOverlayIdx] = useState<null | number>(null)
	const [caption, setCaption] = useState<string | null>(null)

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
		if (pictures.length === 0 || !location || !user) return null

		const imageIds: string[] = []
		for (const { uri } of pictures) imageIds.push(await uploadImage(uri))

		try {
			await addDoc(collection(firestore, "posts"),
				{
					images: imageIds,
					lon: location.coords.longitude,
					lat: location.coords.latitude,
					caption,
					userId: user.uid,
					timestamp: moment().utc().toISOString(),
					locationName
				}
			)
		} catch (e) {
			console.log(e)
		}
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
		await uploadBytesResumable(storageRef(id), blob)

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
				<TextInput
					placeholder="Caption"
					value={caption || ""}
					onChange={e => setCaption(e.nativeEvent.text)}
				/>
				<TextInput
					placeholder="Location name"
					value={locationName}
					onChange={e => setLocationName(e.nativeEvent.text)}
				/>
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

import React, { useEffect, useState } from 'react'
import { PictureOverlay } from '../components/PictureOverlay';
import * as Location from "expo-location"
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Image, View, Text, ScrollView } from "react-native"
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

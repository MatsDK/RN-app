import React from "react"
import { Button, View, Image, ScrollView, TouchableOpacity, StyleSheet, Platform, Dimensions, Text } from "react-native"
import { usePictures } from "../hooks/usePictures"


interface PictureOverlayProps {
	pictureIdx: number,
	hide: () => void
}



export const PictureOverlay: React.FC<PictureOverlayProps> = ({ pictureIdx, hide }) => {
	const [pictures] = usePictures()

	const CARD_WIDTH = Dimensions.get('window').width * 1
	const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1
	const CARD_HEIGHT = Dimensions.get('window').height * 0.7

	return (
		<View style={styles.container}>
			{/* <Button title="Close" onPress={hide} /> */}
			<TouchableOpacity onPress={hide} style={{ marginTop: 50, }}>
				<Text style={{ fontSize: 25, color: "#fff", }}>Close</Text>
			</TouchableOpacity>

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					position: "absolute",
					left: 0,
					top: 100,
					display: "flex",
					overflow: "hidden"

				}}
				horizontal
				pagingEnabled
				decelerationRate={0}
				snapToAlignment='center'
				contentInset={{
					top: 0,
					left: SPACING_FOR_CARD_INSET,
					bottom: 0,
					right: SPACING_FOR_CARD_INSET
				}}
				contentContainerStyle={{
					paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
				}}
			>
				{
					pictures.map(({ uri, width, height }, key) => (
						<View style={{ width: CARD_WIDTH, height: CARD_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center" }} pointerEvents="none">
							<Image
								source={{
									uri,
								}}
								style={{
									zIndex: 2,
									aspectRatio: width / height,
									width: "100%"
								}}
							/>
						</View>
					))
				}
			</ScrollView>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 1,
		backgroundColor: "#000000c5",
	}
})
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Camera } from "expo-camera";
import React, { createRef, useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { HomeStackParamList } from "../../App";
import { usePictures } from "../hooks/usePictures";

export type homeScreenNavigationType = StackNavigationProp<HomeStackParamList, "Home">

interface CameraScreenProps {

}

export const CameraScreen: React.FC<CameraScreenProps> = ({ }) => {
	const navigation = useNavigation<homeScreenNavigationType>()
	const [pictures, setPictures] = usePictures()
	const [type, setType] = useState(Camera.Constants.Type.back);
	const ref = createRef<Camera>();

	const takePicture = async () => {
		const res = await ref.current?.takePictureAsync()
		console.log(res)

		if (res)
			setPictures(p => ([res, ...p]))
	}

	console.log(pictures)

	return (
		<Camera ref={ref} style={styles.camera} type={type}>
			<View style={styles.bottomBar}>
				<TouchableOpacity
					style={{}}
					onPress={() => {
						setType(
							type === Camera.Constants.Type.back
								? Camera.Constants.Type.front
								: Camera.Constants.Type.back
						);
					}}>
					<MaterialIcons name="flip-camera-ios" size={32} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity onPress={takePicture}>
					<View style={styles.takePictureButton} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
					{pictures[0] ?
						<View style={{ position: "relative" }}>
							<Image source={{ uri: pictures[0]?.uri! }} style={{ width: 32, height: 50, borderRadius: 4, borderColor: "#fff", borderWidth: 2 }} />
							<View style={{ width: 15, height: 15, backgroundColor: "#fff", borderRadius: 50, position: "absolute", right: -5, bottom: -5 }}>
								<Text style={{ textAlign: "center" }}>{pictures.length}</Text>
							</View>
						</View>
						:
						<FontAwesome name="file-photo-o" size={32} color="#fff" />
					}
				</TouchableOpacity>
			</View>
		</Camera>
	);
}
const styles = StyleSheet.create({
	camera: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "flex-end"
	},
	bottomBar: {
		display: "flex",
		flexDirection: "row",
		height: 60,
		justifyContent: "space-around",
		alignItems: "center",
		paddingBottom: 25
	},
	takePictureButton: {
		width: 60,
		height: 60,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: "#fff"
	}
})
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Entypo } from "@expo/vector-icons";
import { HomeStackParamList } from '../../App'

interface HomeNavigatorTabBarProps extends BottomTabBarProps {

}

const icons: { [key in keyof HomeStackParamList]: () => React.ReactNode } = {
	"Home": () => (
		<View>
			<Entypo name="home" size={25} />
		</View>
	),
	"Globe": () => (
		<View>
			<Entypo name="globe" size={25} />
		</View>
	),
	"Camera": () => (
		<View>
			<Entypo name="camera" size={25} />
		</View>
	),
	"NewPost": () => (
		<View></View>
	)
}

const bottomBarTabs: Array<keyof HomeStackParamList> = ["Home", "Globe", "Camera"]

export const HomeNavigatorTabBar: React.FC<HomeNavigatorTabBarProps> = ({ descriptors }) => {
	return (
		<View style={styles.container}>
			{Object.values(descriptors)
				.filter(({ route: { name } }) => bottomBarTabs.includes(name as keyof HomeStackParamList))
				.map(({ route: { name }, navigation }) => (
					<TouchableOpacity onPress={() => navigation.navigate(name)} style={{ ...styles.tab, borderTopWidth: navigation.isFocused() ? 1 : 0, paddingTop: navigation.isFocused() ? 10 : 11 }}>
						{icons[name as keyof HomeStackParamList]()}
						<Text>{name}</Text>
					</TouchableOpacity>
				))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 75,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		borderTopWidth: 1,
		borderTopColor: "#000",
		alignItems: "center",
	},
	tab: {
		alignItems: "center",
		borderTopColor: "#000",
		height: "100%",
		flex: 1,
	}
})
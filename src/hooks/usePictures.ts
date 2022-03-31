import { CameraCapturedPicture } from "expo-camera"
import React, { useContext } from "react"
import { UserContext } from "../contexts/userContext"

export const usePictures = (): [CameraCapturedPicture[], React.Dispatch<React.SetStateAction<CameraCapturedPicture[]>>] => {
	const state = useContext(UserContext)

	return [state.pictures, state.setPictures!]
}
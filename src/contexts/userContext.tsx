import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthStackParamList } from "../../App";
import { auth, firestore } from "../firebase";

interface UserContextType {
	user: null | User,
	userLoaded: boolean
}

export interface DbUser {
	email: string,
	username: string,
}

export type User = DbUser & { uid: string }

const defaultUserContext: UserContextType = {
	user: null,
	userLoaded: false
}

const UserContext = createContext<UserContextType>(defaultUserContext)

export type authScreenNavigationType = StackNavigationProp<AuthStackParamList, "Login">

export const UserContextProvider: React.FC = ({ children }) => {
	// const navigation = useNavigation<authScreenNavigationType>()
	const [user, setUser] = useState<DbUser & { uid: string } | null>(null)
	const [userLoaded, setUserLoaded] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setUserLoaded(true)
				setUser(null)
				// navigation.navigate("Login")
			} else {
				const x: DbUser | undefined = (await getDoc(doc(firestore, "users", user.uid))).data() as any
				if (x) {
					setUser({ ...x, uid: user.uid })
				}
				setUserLoaded(true)
			}



		});

		return unsubscribe
	}, [])

	return (
		<UserContext.Provider value={{ user, userLoaded }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserState = (): UserContextType => {
	const state = useContext(UserContext)

	return state
}
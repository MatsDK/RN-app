import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { auth } from "../firebase";

interface UserContextType {
	user: null | User
}

const defaultUserContext: UserContextType = {
	user: null
}

const UserContext = createContext<UserContextType>(defaultUserContext)

export const UserContextProvider: React.FC = ({ children }) => {
	const navigation = useNavigation()
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user)
			if (!user) navigation.navigate("Login" as any)
		});

		return unsubscribe
	}, [])

	return (
		<UserContext.Provider value={{ user }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserState = (): UserContextType => {
	const state = useContext(UserContext)

	return state
}
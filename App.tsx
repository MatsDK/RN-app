import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { authScreenNavigationType, UserContextProvider, useUserState } from './src/contexts/userContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignupScreen } from './src/screens/SignupScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Entypo } from "@expo/vector-icons";

import { LogBox } from 'react-native';
import React from 'react';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const options = {
  headerShown: false,
  gestureEvent: false
}

export default () => {
  return (
    <NavigationContainer>
      <UserContextProvider>
        <StatusBar />
        <Routes />
      </UserContextProvider>
    </NavigationContainer>
  )
}

export type AuthStackParamList = {
  "Login": undefined,
  "SignUp": undefined
}

export type HomeStackParamList = {
  "Home": undefined,
  "Globe": undefined,
  "Camera": undefined
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const HomeNavigator = createBottomTabNavigator<HomeStackParamList>();

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
  )
}

const Routes: React.FC = () => {
  const { user, userLoaded } = useUserState()
  const navigation = useNavigation<authScreenNavigationType>()

  if (!userLoaded) return <LoadingScreen />

  if (!user) navigation.navigate("Login")

  return user ?
    <HomeNavigator.Navigator tabBar={({ descriptors, state, insets, navigation }) => {
      return (<View style={{ height: 75, display: "flex", flexDirection: "row", justifyContent: "space-evenly", borderTopWidth: 1, borderTopColor: "#000", alignItems: "center" }}>
        {Object.values(descriptors).map(({ route: { name }, navigation }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate(name)} style={{ alignItems: "center", borderTopColor: "#000", borderTopWidth: navigation.isFocused() ? 1 : 0, height: "100%", flex: 1 }}>
              {icons[name as keyof HomeStackParamList]()}
              <Text>{name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>)
    }}>
      <HomeNavigator.Screen options={{
        headerShown: false,
      }} name="Home" component={HomeScreen} />
      <HomeNavigator.Screen options={{
        headerShown: false,
      }} name="Camera" component={() => <View><Text>camera</Text></View>} />
      <HomeNavigator.Screen options={{
        headerShown: false,
      }} name="Globe" component={() => <View><Text>Globe</Text></View>} />
    </HomeNavigator.Navigator> :
    <AuthStack.Navigator>
      <AuthStack.Screen options={options} name="Login" component={LoginScreen} />
      <AuthStack.Screen options={options} name="SignUp" component={SignupScreen} />
    </AuthStack.Navigator>
}

// export default function App() {
//   const [hasPermission, setHasPermission] = useState<null | boolean>(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   const ref = useRef<any>(null)


//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {/* <Text style={{ color: "#eee" }}>Open up App.tsx to start working on your app!</Text>
//       <Button title="Select image" onPress={async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.All,
//         });

//         console.log(result);
//       }} />
//       <StatusBar style="auto" /> */}
//       <Camera ref={ref} style={styles.camera} type={type}>
//         <View style={{}}>
//           <TouchableOpacity
//             style={{}}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//             <Text>Flip</Text>
//           </TouchableOpacity>
//           <Button title="Take Picture" onPress={async () => {
//             const res = await ref.current?.takePictureAsync()
//             console.log(res)
//           }} />
//         </View>
//       </Camera>
//       <Image
//         style={{
//           width: "20%",
//           height: "20%"
//         }}
//         source={{
//           uri: "file:///var/mobile/Containers/Data/Application/718C6E9F-14C4-4D96-B324-7D4616D861E5/Library/Caches/ExponentExperienceData/%2540matsdk%252Fmy-app/Camera/6C96A1D6-056C-4E7C-8410-7A7C13F8BEA6.jpg"
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#222',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   camera: {
//     width: "100%",
//     height: "60%"
//   }
// });

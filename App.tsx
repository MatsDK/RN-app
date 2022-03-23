import { StatusBar } from 'expo-status-bar';
// import { Camera } from 'expo-camera';
// import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
// import { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignupScreen } from './src/screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="SignUp" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: "100%",
    height: "60%"
  }
});

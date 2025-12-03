import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Platform, Text } from 'react-native';

export default function App() {
  if (Platform.OS === 'ios') {
    return <AppleMaps.View style={{ flex: 1 }} />;
  } else if (Platform.OS === 'android') {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}

// import { Text, StyleSheet, View } from "react-native";
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// export default function Index() {
//   return (
//     <View>
//       {/* <MapView provider={PROVIDER_GOOGLE} style={styles.map}/> */}
//       <MapView  style={styles.map}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   map: {
//     height: '75%',
//     width: '100%',
//   }
// });
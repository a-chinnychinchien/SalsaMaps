import MyMapView from "@/src/components/MyMapView";
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  return <MyMapView/>;
}


//
// react-native-maps try
//

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
import MyMapView from "@/src/components/MyMapView";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Text } from 'react-native'

export default function App() {
  let [initialLoc, setInitialLoc] = useState<Location.LocationObject | null>(null)
  useEffect(() => {
    async function getCurrLoc() {
      try {
        const initialLoc = await Location.getCurrentPositionAsync();
        setInitialLoc(initialLoc);
      }
      catch (error) {
        console.log(error)
        // Fallback
        setInitialLoc({
          coords: { altitude: null, accuracy: null, altitudeAccuracy: null, heading: 0, speed: 0, latitude: 40.74619587808718, longitude: -73.92451420314279 },
          timestamp: Date.now()
        })
      }
    }
    getCurrLoc();
  }, [])

  if (initialLoc === null) {
    // Return a loading state or a blank screen until data is ready
    return <Text>Loading Location...</Text>;
  }

  return <MyMapView initialLoc={initialLoc} />;
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
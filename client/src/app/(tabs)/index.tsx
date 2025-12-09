import MyMapView from "@/src/components/MyMapView";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Text } from 'react-native'
import { DEFAULT_INIT_LOC } from '../../constants/constants';

export default function App() {
  let [initialLoc, setInitialLoc] = useState<Location.LocationObject | null>(null)
  useEffect(() => {
    async function getCurrLoc() {
      // Request permissions if needed
      let locPermissions = await Location.getForegroundPermissionsAsync()
      if (!locPermissions.granted) {
        locPermissions = await Location.requestForegroundPermissionsAsync()
      }

      // Get current location or use default
      let initialLoc = DEFAULT_INIT_LOC;
      if (locPermissions.granted) {
        try {
          initialLoc = await Location.getCurrentPositionAsync();
        }
        catch (error) {
          console.log(`Error obtaining current position: ${error}`)
          console.log('Defaulting to Times Square as initial location.')
        }
      }
      else {
        console.log('Location permissions not granted.')
        console.log('Defaulting to Times Square as initial location.')
      }
      setInitialLoc(initialLoc);
    }

    // run the async fxn
    getCurrLoc();
  }, [])

  if (initialLoc === null) {
    return <Text>Loading Location...</Text>;
  }

  return <MyMapView initialLoc={initialLoc} />;
}
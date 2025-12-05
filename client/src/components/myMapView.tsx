import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Platform, Text } from 'react-native';
import React, { useState, useRef } from 'react';
import { IOS, ANDROID } from '../constants/constants';
import * as Location from 'expo-location';
import { TrueSheet } from "@lodev09/react-native-true-sheet"
import {SalsaEvent} from '../testing_data/events'



export default function MyMapView(): React.JSX.Element {
  const botSheet = useRef<TrueSheet>(null);
  const [selectedEvent, setSelectedEvent] = useState<SalsaEvent | null>(null);

  // Obtain current location

  function loadEventInfo(): void {
    console.log('marker clicked')
  }

  if (Platform.OS === IOS) {
    return <AppleMaps.View
      style={{ flex: 1 }}
      cameraPosition={{
        coordinates: { latitude: 40.68656585481457, longitude: -73.96771131848895 },
        zoom: 16
      }}
      markers={[
        {
          coordinates: { latitude: 40.68656585481457, longitude: -73.96771131848895 },
          id: '1',
          systemImage: 'mappin.square',
          tintColor: 'indigo',
          title: 'Initial'
        }
      ]}
      onMarkerClick={loadEventInfo}
    // onMarkerClick={(e) => {
    //   console.log('marker clicked')
    // }}
    />;
  } else if (Platform.OS === ANDROID) {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
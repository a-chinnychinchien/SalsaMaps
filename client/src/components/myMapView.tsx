import { StyleSheet, Platform, Text, View, Button, Modal, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { IOS, ANDROID } from '../constants/constants';
import * as Location from 'expo-location';
import { TrueSheet } from "@lodev09/react-native-true-sheet"
import { SalsaEvent, currEvents } from '../testing_data/events'
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {EventSheet} from './EventSheet'

type AppleMapMarker = {
  coordinates: {latitude: number, longitude: number}
  title: string
  id: string
  systemImage?: string
  tintColor?: string
}

async function getCurrMarkers(): Promise<AppleMapMarker[]> {
  let currMarkers:AppleMapMarker[] = []
  
  for (let i=0;i<currEvents.length;i++) {
    const currEvent = currEvents[i];
    // Geocode the address
    const geocode = await Location.geocodeAsync(currEvent.address);
    currMarkers.push({
      coordinates: {latitude: geocode[0].latitude, longitude: geocode[0].longitude},
      id: String(i),
      title: `Event${i}`
    })
  }

  return currMarkers
} 

export default function MyMapView({initialLoc} : {initialLoc: Location.LocationObject}): React.JSX.Element {
  // Obtain markers
  let [markers, setMarkers] = useState<AppleMapMarker[]>([])
  useEffect(()=>{
    async function loadMarkers(){
      const markers = await getCurrMarkers();
      setMarkers(markers);
    }
    loadMarkers();
  },[]);

  // Bottom Sheet setup
  const sheetRef = useRef<TrueSheet>(null);
  const present = async () => {
    await sheetRef.current?.present()
    console.log('horray! sheet has been presented')
  }

  if (Platform.OS === IOS) {
    return <>
      <AppleMaps.View
        style={{ flex: 1 }}
        markers={markers}
        onMarkerClick={present}
        cameraPosition={{
          coordinates:{latitude: initialLoc.coords.latitude, longitude: initialLoc.coords.longitude},
          zoom: 12
        }}
      />
      <EventSheet ref={sheetRef}/>
    </>
  } else if (Platform.OS === ANDROID) {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}

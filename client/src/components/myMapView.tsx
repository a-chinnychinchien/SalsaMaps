import { StyleSheet, Platform, Text, View, Button, Modal, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { IOS, ANDROID } from '../constants/constants';
import * as Location from 'expo-location';
import { TrueSheet } from "@lodev09/react-native-true-sheet"
import { SalsaEvent, currEvents } from '../testing_data/events'
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

type AppleMapMarker = {
  coordinates: {latitude: number, longitude: number}
  title: string
  id: string
  systemImage?: string
  tintColor?: string
}

async function getCurrMarkers(): Promise<AppleMapMarker[]> {
  let currMarkers:AppleMapMarker[] = [{
          coordinates: { latitude: 40.68666348121151, longitude: -73.9676898608171 },
          title: 'Initial',
          id: '-1',
        }]
  
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

export default function MyMapView(): React.JSX.Element {
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
  const sheet = useRef<TrueSheet>(null);
  const present = async () => {
    await sheet.current?.present()
    console.log('horray! sheet has been presented')
  }
  const dismiss = async () => {
    await sheet.current?.dismiss()
    console.log('Bye bye 👋')
  }

  if (Platform.OS === IOS) {
    return <>
      <AppleMaps.View
        style={{ flex: 1 }}
        markers={markers}
        onMarkerClick={present}
        cameraPosition={{
          coordinates: { latitude: 40.68666348121151, longitude: -73.9676898608171 },
          zoom: 12
        }}
      />
      <TrueSheet
        ref={sheet}
        detents={[0.5, 0.8]}
        cornerRadius={24}
        backgroundColor='rgba(52, 52, 52, 0.8)'
        name='SalaEventInfoSheet'>
          <Pressable onPress={dismiss} style={styles.dismissButton}>
            <Text style={styles.dismissText}> Dismissal Button</Text>
          </Pressable>
      </TrueSheet>
    </>
  } else if (Platform.OS === ANDROID) {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}

const styles = StyleSheet.create({
    dismissButton: {
        padding: 15,
        backgroundColor: '#007AFF', // Standard iOS blue
        borderRadius: 8,
        justifyContent: 'center',
        margin: 20, // Add margin to ensure it's not hidden by the edge
    },
    dismissText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
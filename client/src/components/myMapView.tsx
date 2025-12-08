import { StyleSheet, Platform, Text, View, Button, Modal, Pressable } from 'react-native';
import React, { useState, useRef } from 'react';
import { IOS, ANDROID } from '../constants/constants';
import * as Location from 'expo-location';
import { TrueSheet } from "@lodev09/react-native-true-sheet"
import { SalsaEvent, currEvents } from '../testing_data/events'
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'



export default function MyMapView(): React.JSX.Element {
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
        markers={[{
          coordinates: { latitude: 40.68666348121151, longitude: -73.9676898608171 },
          title: 'Initial',
          id: '0'
        }]}
        onMarkerClick={present}
        cameraPosition={{
          coordinates: { latitude: 40.68666348121151, longitude: -73.9676898608171 },
          zoom: 14
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
import * as Location from 'expo-location'

export const IOS = 'ios';
export const ANDROID = 'android';

export const DEFAULT_INIT_LOC: Location.LocationObject = {
  coords: {
    latitude: 40.75810470031284,
    longitude: -73.98555333197822,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  },
  timestamp: Date.now()
}
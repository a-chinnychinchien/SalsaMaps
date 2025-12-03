import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Platform, Text } from 'react-native';
import {IOS, ANDROID} from '../constants/constants';

export default function myMapView(): React.JSX.Element{
  if (Platform.OS === IOS) {
    return <AppleMaps.View style={{ flex: 1 }} />;
  } else if (Platform.OS === ANDROID) {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
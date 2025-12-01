import { Text, StyleSheet, View } from "react-native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function Index() {
  return (
    <View>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    height: '50%',
    width: '50%',
  }
});
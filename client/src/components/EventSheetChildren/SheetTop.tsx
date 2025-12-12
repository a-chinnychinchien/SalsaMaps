import { Text, View, Image, StyleSheet } from 'react-native'

const DEFAULT_FLYER_IMG = '../../testing_data/flyers/noImage.jpg'

type sheetTopArgs = {
  imgSrc?: string
  address: string
}

export default function SheetTop(args: sheetTopArgs) {
  const finalSrc = (args.imgSrc) ? args.imgSrc : DEFAULT_FLYER_IMG
  return <View style={styles.container}>
    <View style={{width:100, height:100, backgroundColor: 'green'}}></View> 
    {/* <Image style={styles.image} resizeMode='contain' source={require('../../testing_data/flyers/noImage.jpg')} /> */}
    {/* <Image style={styles.image} resizeMode='contain' source={require('../../testing_data/flyers/flyer0.jpeg')} /> */}
    <View style={styles.addressContainer}>
      <Text style={styles.address}>{args.address}</Text>
      <Text style={styles.address}>Brooklyn, NY 11238</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  image: {
    height: 50,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    backgroundColor: 'grey'
  },
  address: {
    paddingLeft: 5,
    fontSize: 14,
  },
  addressContainer: {
    flexDirection: 'column',
  }
});
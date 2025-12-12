import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type HeaderProps = {
  title: string,
  dismissFxn: () => Promise<void>
}

export default function EventHeader(props: HeaderProps): React.JSX.Element {
  //TODO: make scrollview animated.
  return <>
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <ScrollView horizontal={true}>
          <Text style={styles.titleText}>{props.title}</Text>
        </ScrollView>
      </View>
      <Pressable onPress={props.dismissFxn} 
      style={({pressed})=> [styles.exitButton, pressed && {backgroundColor: 'grey'}]}>
        <MaterialIcons name='close' size={25} color='grey'/>
      </Pressable>
    </View>
  </>
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 9,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'grey',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 18,
  },
  exitButton: {
    backgroundColor: 'white',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  exitButtonPressed: {
    flex:1
  }
})
import { TrueSheet } from "@lodev09/react-native-true-sheet"
import { RefObject } from 'react'
import { View, ScrollView, FlatList, Image, Pressable, Text, StyleSheet } from 'react-native'
import EventHeader from './EventSheetChildren/header'
import SheetTop from './EventSheetChildren/SheetTop'

type EventSheetProps = {
  ref: RefObject<TrueSheet | null>
}

export const EventSheet = (props: EventSheetProps) => {
  const dismiss = async () => {
    await props.ref.current?.dismiss()
    console.log('Bye bye 👋')
  }

  return <TrueSheet
    ref={props.ref}
    header={<EventHeader title='A Salsa Event with a really long ass title' dismissFxn={dismiss} />}
    detents={[0.5]}
    cornerRadius={24}
    backgroundColor='rgba(52, 52, 52)'
    // backgroundColor='rgba(52, 52, 52, 0.8)'
    scrollable={true}
    name='SalsaEventInfoSheet'>
    <View style={{margin:20}}>
    <ScrollView style={styles.viewUnderHeader}>
      <SheetTop address='360 Clinton Ave'></SheetTop>
      <View style={{flex:1, backgroundColor: 'red'}}>
      <Text style={styles.infoText}>Cover: $0</Text>
      </View>
      <Text style={styles.infoText}>Start: 9 PM</Text>
      <Text style={styles.infoText}>End: 2 AM</Text>
      <Text style={styles.infoText}>Music: DJ Erod</Text>
    </ScrollView>
    </View>
  </TrueSheet>
}

const styles = StyleSheet.create({
  infoText: {
    fontSize: 22
  },
  viewUnderHeader: {
    flex:1,
    backgroundColor: 'white',
    // justifyContent: "flex-start",
    // alignItems: 'flex-start',
    margin: 20,
    padding: 20
  }
});
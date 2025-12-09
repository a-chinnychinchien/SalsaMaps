import { TrueSheet } from "@lodev09/react-native-true-sheet"
import { RefObject } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

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
    detents={[0.5, 0.8]}
    cornerRadius={24}
    backgroundColor='rgba(52, 52, 52, 0.8)'
    name='SalaEventInfoSheet'>
    <Pressable onPress={dismiss} style={styles.dismissButton}>
      <Text style={styles.dismissText}> Dismissal Button</Text>
    </Pressable>
  </TrueSheet>
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
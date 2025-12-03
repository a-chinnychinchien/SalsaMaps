import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return <Tabs>
    <Tabs.Screen
      name = 'index'
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home-filled" color={color} />
      }}
    />
    <Tabs.Screen
      name = 'settings'
      options={{
        title: 'Settings',
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name='settings' color={color} />
      }}
    />
  </Tabs>
}
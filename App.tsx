import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import RemindersScreen from './screens/RemindersScreen';
import {RemindersProvider} from './context/RemindersContext';

export default function App() {
  const Tab = createBottomTabNavigator();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <RemindersProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Reminders Screen" component={RemindersScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </RemindersProvider>
    </View>
  );
}

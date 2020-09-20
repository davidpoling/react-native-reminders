import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import RemindersScreen from './screens/RemindersScreen';
import {RemindersProvider} from './context/RemindersContext';

export default function App() {
  const Stack = createStackNavigator();
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
            <Stack.Screen name="Reminders Screen" component={RemindersScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </RemindersProvider>
    </View>
  );
}

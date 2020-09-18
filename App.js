import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet, YellowBox} from 'react-native';
import Header from './components/Header';
import RemindersScreen from './screens/RemindersScreen';
import {RemindersProvider} from './context/RemindersContext';

export default (App = () => {
  const Stack = createStackNavigator();

  // Currently a dependency cycle within react-native.
  // This command just removes the yellow box warning from the app display.
  // YellowBox.ignoreWarnings(['Require cycle:']);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Header title="Reminders" />
      <RemindersProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Reminders Screen">
            <Stack.Screen name="Reminders Screen" component={RemindersScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </RemindersProvider>
    </View>
  );
});

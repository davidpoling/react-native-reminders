import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import RemindersScreen from './screens/RemindersScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import RecipesScreen from './screens/RecipesScreen';
import {connection, setConnectionId} from './config/appConfig';

export default function App() {
  const Tab = createBottomTabNavigator();
  const REMINDERS_SCREEN_NAME = 'Reminders';
  const SHOPPING_LIST_SCREEN_NAME = 'Shopping List';
  const RECIPES_SCREEN_NAME = 'Recipes';
  const isDarkMode = useDarkMode();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  useEffect(() => {
    if (!connection.connectionId) {
      connection.start().then(() => {
        setConnectionId(connection.connectionId);
      });
    }

    return () => {
      connection.stop();
      setConnectionId('');
    };
  }, []);

  const NavigationContainerDarkTheme = {
    ...DarkTheme,
  };

  const NavigationContainerDefaultTheme = {
    ...DefaultTheme,
  };

  return (
    <View style={styles.container}>
      <NavigationContainer theme={isDarkMode ? NavigationContainerDarkTheme : NavigationContainerDefaultTheme}>
        <Tab.Navigator
          screenOptions={({route}: any) => ({
            tabBarIcon: ({focused, color, size}: any) => {
              let iconName: string;

              if (route.name === REMINDERS_SCREEN_NAME) {
                iconName = focused ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline';
              } else if (route.name === SHOPPING_LIST_SCREEN_NAME) {
                iconName = focused ? 'ios-cart' : 'ios-cart-outline';
              } else if (route.name === RECIPES_SCREEN_NAME) {
                iconName = focused ? 'ios-restaurant' : 'ios-restaurant-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#3399ff',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name={REMINDERS_SCREEN_NAME} component={RemindersScreen} />
          <Tab.Screen name={SHOPPING_LIST_SCREEN_NAME} component={ShoppingListScreen} />
          <Tab.Screen name={RECIPES_SCREEN_NAME} component={RecipesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

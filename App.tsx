import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import {useColorScheme} from 'react-native';
import RemindersScreen from './screens/RemindersScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

export default function App() {
  const REMINDERS_SCREEN_NAME = 'Reminders';
  const SHOPPING_LIST_SCREEN_NAME = 'Shopping List';
  const RECIPES_SCREEN_NAME = 'Recipes';
  const isDarkMode = useColorScheme() === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  const NavigationContainerDarkTheme = {
    ...DarkTheme,
  };

  const NavigationContainerDefaultTheme = {
    ...DefaultTheme,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <NavigationContainer theme={isDarkMode ? NavigationContainerDarkTheme : NavigationContainerDefaultTheme}>
          <Tab.Navigator
            screenOptions={({route}: any) => ({
              tabBarIcon: ({focused, color, size}: any) => {
                let iconName: string = 'ios-checkmark-circle';

                if (route.name === REMINDERS_SCREEN_NAME) {
                  iconName = focused ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline';
                } else if (route.name === SHOPPING_LIST_SCREEN_NAME) {
                  iconName = focused ? 'ios-cart' : 'ios-cart-outline';
                } else if (route.name === RECIPES_SCREEN_NAME) {
                  iconName = focused ? 'ios-restaurant' : 'ios-restaurant-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#3399ff',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}>
            <Tab.Screen name={REMINDERS_SCREEN_NAME} component={RemindersScreen} />
            <Tab.Screen name={SHOPPING_LIST_SCREEN_NAME} component={ShoppingListScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </QueryClientProvider>
  );
}

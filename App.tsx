import React from 'react';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import RemindersScreen from './screens/RemindersScreen';
import {RemindersProvider} from './context/RemindersContext';
import ShoppingListScreen from './screens/ShoppingListScreen';
import RecipesScreen from './screens/RecipesScreen';

export default function App() {
  const Tab = createBottomTabNavigator();
  const REMINDERS_SCREEN_NAME = 'Reminders';
  const SHOPPING_LIST_SCREEN_NAME = 'Shopping List';
  const RECIPES_SCREEN_NAME = 'Recipes';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <RemindersProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}: any) => ({
              tabBarIcon: ({focused, color, size}: any) => {
                let iconName: string;

                if (route.name === REMINDERS_SCREEN_NAME) {
                  iconName = focused
                    ? 'ios-checkmark-circle'
                    : 'ios-checkmark-circle-outline';
                } else if (route.name === SHOPPING_LIST_SCREEN_NAME) {
                  iconName = focused ? 'ios-cart' : 'ios-cart-outline';
                } else if (route.name === RECIPES_SCREEN_NAME) {
                  iconName = focused
                    ? 'ios-restaurant'
                    : 'ios-restaurant-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#314b7f',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen
              name={REMINDERS_SCREEN_NAME}
              component={RemindersScreen}
            />
            <Tab.Screen
              name={SHOPPING_LIST_SCREEN_NAME}
              component={ShoppingListScreen}
            />
            <Tab.Screen name={RECIPES_SCREEN_NAME} component={RecipesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </RemindersProvider>
    </View>
  );
}

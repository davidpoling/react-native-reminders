import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import ShoppingListItem from '../beans/ShoppingListItem';
import Header from '../components/Header';
import styles from './ScreenStyles';

export default function ShoppingListScreen({navigation}: any) {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({item}) => (
            <Text>{item.text}</Text>
            // <ListItem item={item} completeReminder={completeReminder} />
          )}
        />
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No Shopping List</Text>
        </View>
      )}
    </View>
  );
}

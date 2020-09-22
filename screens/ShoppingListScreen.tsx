import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import ShoppingListItem from '../beans/ShoppingListItem';
import Header from '../components/Header';
import AddShoppingListItem from '../components/shoppingList/AddShoppingListItem';
import ShoppingListScreenItem from '../components/shoppingList/ShoppingListScreenItem';
import styles from './ScreenStyles';

export default function ShoppingListScreen({navigation}: any) {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  async function completeShoppingListItem(shoppingListItem: ShoppingListItem) {
    // TODO: Finish complete logic.
  }

  async function addShoppingListItem(text: string) {
    // TODO: Finish complete logic.
  }

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddShoppingListItem addShoppingListItem={addShoppingListItem} />
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({item}) => (
            <ShoppingListScreenItem
              item={item}
              completeShoppingListItem={completeShoppingListItem}
            />
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

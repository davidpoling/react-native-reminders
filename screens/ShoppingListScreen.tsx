import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShoppingListItem from '../beans/ShoppingListItem';
import Header from '../components/Header';
import AddShoppingListItem from '../components/shoppingList/AddShoppingListItem';
import CheckedShoppingListItem from '../components/shoppingList/CheckedShoppingListItem';
import ShoppingListScreenItem from '../components/shoppingList/ShoppingListScreenItem';
import {shoppingListService} from '../config/serverConfig';
import styles from './ScreenStyles';

export default function ShoppingListScreen({navigation}: any) {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [shoppingListItemToEdit, setShoppingListItemToEdit] = useState<ShoppingListItem>(null);
  const [checkedShoppingListItems, setCheckedShoppingListItems] = useState<ShoppingListItem[]>([]);

  useEffect(() => {
    shoppingListService
      .getShoppingList()
      .then(shoppingList => {
        setShoppingList(shoppingList.filter(s => !s.checked));
        setCheckedShoppingListItems(shoppingList.filter(s => s.checked));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  async function addShoppingListItem(text: string) {
    try {
      const newShoppingListItem = await shoppingListService.addShoppingListItem(new ShoppingListItem(text));
      setShoppingList(prevShoppingList => {
        return [newShoppingListItem, ...prevShoppingList];
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function checkShoppingListItem(shoppingListItemToCheck: ShoppingListItem) {
    try {
      shoppingListItemToCheck.checked = !shoppingListItemToCheck.checked;
      const updatedShoppingListItem: ShoppingListItem = await shoppingListService.updateShoppingListItem(shoppingListItemToCheck);
      setShoppingList(prevShoppingList => {
        return prevShoppingList.filter(s => s.id !== updatedShoppingListItem.id);
      });
      setCheckedShoppingListItems(prevShoppingList => {
        return [updatedShoppingListItem, ...prevShoppingList];
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function editShoppingListItem(id: string, text: string) {
    try {
      let shoppingListItemToUpdate: ShoppingListItem = shoppingList.find(s => s.id === id);
      shoppingListItemToUpdate.text = text;
      const updatedShoppingListItem: ShoppingListItem = await shoppingListService.updateShoppingListItem(shoppingListItemToUpdate);
      let prevShoppingList: ShoppingListItem[] = shoppingList.slice();
      prevShoppingList.splice(prevShoppingList.indexOf(shoppingListItemToUpdate), 1, updatedShoppingListItem);
      setShoppingList(prevShoppingList);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteShoppingListItems(shoppingListItems: ShoppingListItem[]) {
    for (let shoppingListItem of shoppingListItems) {
      await shoppingListService.deleteShoppingListItem(shoppingListItem.id);
    }
    setCheckedShoppingListItems([]);
  }

  function onEditPressed(shoppingListItem: ShoppingListItem) {
    setShoppingListItemToEdit(shoppingListItem);
  }

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddShoppingListItem
        addShoppingListItem={addShoppingListItem}
        shoppingListItemToEdit={shoppingListItemToEdit}
        setShoppingListItemToEdit={setShoppingListItemToEdit}
        editShoppingListItem={editShoppingListItem}
      />
      {shoppingList.length > 0 || checkedShoppingListItems.length > 0 ? (
        <>
          {shoppingList.length > 0 && (
            <FlatList
              data={shoppingList}
              renderItem={({item}) => <ShoppingListScreenItem item={item} checkShoppingListItem={checkShoppingListItem} onEditPressed={onEditPressed} />}
            />
          )}

          {checkedShoppingListItems.length > 0 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                  marginTop: 5,
                }}>
                <Text style={{color: '#828282', marginLeft: 10}}>Checked</Text>
                <View
                  style={{
                    borderWidth: 0.75,
                    borderColor: '#D9E0E3',
                    margin: 5,
                    width: '80%',
                    height: 0,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3399ff',
                  padding: 5,
                  margin: 5,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  width: '20%',
                  borderRadius: 100,
                }}
                onPress={() => deleteShoppingListItems(checkedShoppingListItems)}>
                <Icon name="ios-trash-outline" size={20} style={{color: 'white'}} />
              </TouchableOpacity>
              <FlatList data={checkedShoppingListItems} renderItem={({item}) => <CheckedShoppingListItem item={item} />} />
            </>
          )}
        </>
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No Shopping List</Text>
        </View>
      )}
    </View>
  );
}

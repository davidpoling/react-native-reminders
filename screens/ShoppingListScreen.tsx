import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import ShoppingListItem from '../beans/ShoppingListItem';
import Header from '../components/Header';
import AddShoppingListItem from '../components/shoppingList/AddShoppingListItem';
import CheckedShoppingListItem from '../components/shoppingList/CheckedShoppingListItem';
import ShoppingListScreenItem from '../components/shoppingList/ShoppingListScreenItem';
import {connection, connectionId, shoppingListService} from '../config/appConfig';
import {
  SHOPPING_LIST_ITEMS_DELETED,
  SHOPPING_LIST_ITEM_CREATED,
  SHOPPING_LIST_ITEM_UPDATED,
} from '../services/message-constants';
import styles from './ScreenStyles';

export default function ShoppingListScreen({navigation}: any) {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [shoppingListItemToEdit, setShoppingListItemToEdit] = useState<ShoppingListItem>(null);
  const [checkedShoppingListItems, setCheckedShoppingListItems] = useState<ShoppingListItem[]>([]);
  const [renderedShoppingList, setRenderedShoppingList] = useState<any>([]);
  const [renderedCheckedShoppingListItems, setRenderedCheckedShoppingListItems] = useState<any>([]);

  async function addShoppingListItem(text: string) {
    try {
      const newShoppingListItem = await shoppingListService.addShoppingListItem(
        new ShoppingListItem(text),
        connectionId,
      );
      setShoppingList(prevShoppingList => {
        return [newShoppingListItem, ...prevShoppingList];
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function checkShoppingListItem(shoppingListItemToCheck: ShoppingListItem) {
    try {
      shoppingListItemToCheck.complete = !shoppingListItemToCheck.complete;
      const updatedShoppingListItem: ShoppingListItem = await shoppingListService.updateShoppingListItem(
        shoppingListItemToCheck,
        connectionId,
      );
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
      const updatedShoppingListItem: ShoppingListItem = await shoppingListService.updateShoppingListItem(
        shoppingListItemToUpdate,
        connectionId,
      );
      let prevShoppingList: ShoppingListItem[] = shoppingList.slice();
      prevShoppingList.splice(prevShoppingList.indexOf(shoppingListItemToUpdate), 1, updatedShoppingListItem);
      setShoppingList(prevShoppingList);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteShoppingListItems(shoppingListItems: ShoppingListItem[]) {
    for (let shoppingListItem of shoppingListItems) {
      await shoppingListService.deleteShoppingListItem(shoppingListItem.id, connectionId);
    }
    setCheckedShoppingListItems([]);
  }

  function onEditPressed(shoppingListItem: ShoppingListItem) {
    setShoppingListItemToEdit(shoppingListItem);
  }

  function renderShoppingListItems() {
    let renderedItems: any = [];

    shoppingList.forEach(item => {
      renderedItems.push(
        <ShoppingListScreenItem
          key={item.id}
          item={item}
          checkShoppingListItem={checkShoppingListItem}
          onEditPressed={onEditPressed}
        />,
      );
    });

    setRenderedShoppingList(renderedItems);
  }

  function renderCheckedShoppingListItems() {
    let renderedItems: any = [];

    checkedShoppingListItems.forEach(item => {
      renderedItems.push(<CheckedShoppingListItem key={item.id} item={item} />);
    });

    setRenderedCheckedShoppingListItems(renderedItems);
  }

  useEffect(() => {
    shoppingListService
      .getShoppingList()
      .then(shoppingList => {
        setShoppingList(shoppingList.filter(s => !s.complete));
        setCheckedShoppingListItems(shoppingList.filter(s => s.complete));
      })
      .catch(error => {
        console.log(error);
      });

    connection.on(SHOPPING_LIST_ITEM_CREATED, (text: string) => {
      const newShoppingListItem: ShoppingListItem = JSON.parse(text);
      setShoppingList(prevShoppingList => {
        return [newShoppingListItem, ...prevShoppingList];
      });
    });

    connection.on(SHOPPING_LIST_ITEM_UPDATED, (text: string) => {
      const updatedShoppingListItem: ShoppingListItem = JSON.parse(text);
      if (updatedShoppingListItem.complete) {
        setShoppingList(prevShoppingList => {
          return prevShoppingList.filter(s => s.id !== updatedShoppingListItem.id);
        });
        setCheckedShoppingListItems(prevShoppingList => {
          return [updatedShoppingListItem, ...prevShoppingList];
        });
      } else {
        let prevShoppingList: ShoppingListItem[] = shoppingList.slice();
        let shoppingListItemToUpdate: ShoppingListItem = shoppingList.find(s => s.id === updatedShoppingListItem.id);
        prevShoppingList.splice(prevShoppingList.indexOf(shoppingListItemToUpdate), 1, updatedShoppingListItem);
        setShoppingList(prevShoppingList);
      }
    });

    connection.on(SHOPPING_LIST_ITEMS_DELETED, (text: string) => {
      const deletedShoppingListItem: ShoppingListItem = JSON.parse(text);
      let shoppingListItemToDelete: ShoppingListItem = shoppingList.find(r => r.id === deletedShoppingListItem.id);
      let prevShoppingList: ShoppingListItem[] = [];
      if (shoppingList.indexOf(shoppingListItemToDelete) > 0) {
        prevShoppingList = shoppingList.slice();
        prevShoppingList.splice(prevShoppingList.indexOf(shoppingListItemToDelete), 1, shoppingListItemToDelete);
        setShoppingList(prevShoppingList);
      }
      if (checkedShoppingListItems.indexOf(shoppingListItemToDelete) > 0) {
        prevShoppingList = checkedShoppingListItems.slice();
        prevShoppingList.splice(prevShoppingList.indexOf(shoppingListItemToDelete), 1, shoppingListItemToDelete);
        setCheckedShoppingListItems(prevShoppingList);
      }
    });
  }, []);

  useEffect(() => {
    if (shoppingList.length > 0) {
      renderShoppingListItems();
    }
  }, [shoppingList]);

  useEffect(() => {
    if (checkedShoppingListItems.length > 0) {
      renderCheckedShoppingListItems();
    }
  }, [checkedShoppingListItems]);

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
          <ScrollView>
            <>
              {shoppingList.length > 0 && <>{renderedShoppingList}</>}

              {checkedShoppingListItems.length > 0 && (
                <>
                  <View style={styles.dividerContainer}>
                    <Text style={styles.dividerCompleteText}>Checked</Text>
                    <View style={styles.divider} />
                  </View>
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => deleteShoppingListItems(checkedShoppingListItems)}>
                    <Icon name="ios-trash-outline" size={20} style={styles.completeIcon} />
                  </TouchableOpacity>
                  <>{renderedCheckedShoppingListItems}</>
                </>
              )}
            </>
          </ScrollView>
        </>
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No Shopping List</Text>
        </View>
      )}
    </View>
  );
}

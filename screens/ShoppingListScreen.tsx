import React, {useState, useEffect, useRef} from 'react';
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

  /**
   * These refs act as instance variables,
   * and are used because the connection listeners don't have updated state.
   *
   * They get updated every time the shoppingList and checkedShoppingListItems get updated.
   */
  let shoppingListRef = useRef<ShoppingListItem[]>([]);
  let checkedShoppingListItemsRef = useRef<ShoppingListItem[]>([]);

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

  async function editShoppingListItem(id: number, text: string) {
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

  function setupConnectionListeners() {
    connection.on(SHOPPING_LIST_ITEM_CREATED, (text: string) => {
      const newShoppingListItem: ShoppingListItem = JSON.parse(text);
      setShoppingList(prevShoppingList => {
        return [newShoppingListItem, ...prevShoppingList];
      });
    });

    connection.on(SHOPPING_LIST_ITEM_UPDATED, (text: string) => {
      const updatedShoppingListItem: ShoppingListItem = JSON.parse(text);

      // Use the refs instead, as they will have updated state.
      let shoppingListItemToUpdate: ShoppingListItem = shoppingListRef.current.find(
        r => r.id === updatedShoppingListItem.id,
      );
      let copy: ShoppingListItem[] = shoppingListRef.current.slice();

      if (!shoppingListItemToUpdate.complete && !updatedShoppingListItem.complete) {
        copy.splice(copy.indexOf(shoppingListItemToUpdate), 1, updatedShoppingListItem);
        setShoppingList(copy);
      } else if (!shoppingListItemToUpdate.complete && updatedShoppingListItem.complete) {
        copy.splice(copy.indexOf(shoppingListItemToUpdate), 1);
        setShoppingList(copy);
        setCheckedShoppingListItems(prevShoppingList => {
          return [updatedShoppingListItem, ...prevShoppingList];
        });
      }
    });

    connection.on(SHOPPING_LIST_ITEMS_DELETED, (text: string) => {
      const deletedShoppingListId: number = JSON.parse(text);

      // Use the refs instead, as they will have updated state.
      let shoppingListItemToDelete: ShoppingListItem = checkedShoppingListItemsRef.current.find(
        r => r.id === deletedShoppingListId,
      );
      let copy: ShoppingListItem[] = checkedShoppingListItemsRef.current.slice();

      copy.splice(copy.indexOf(shoppingListItemToDelete), 1);
      setCheckedShoppingListItems(copy);
    });
  }

  useEffect(() => {
    shoppingListService
      .getShoppingList()
      .then(shoppingList => {
        setShoppingList(shoppingList.filter(s => !s.complete));
        setCheckedShoppingListItems(shoppingList.filter(s => s.complete));
        setupConnectionListeners();
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (shoppingList.length > 0) {
      renderShoppingListItems();
      shoppingListRef.current = shoppingList.slice();
    }
  }, [shoppingList]);

  useEffect(() => {
    if (checkedShoppingListItems.length > 0) {
      renderCheckedShoppingListItems();
      checkedShoppingListItemsRef.current = checkedShoppingListItems.slice();
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

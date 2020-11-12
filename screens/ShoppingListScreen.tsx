import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import ShoppingListItem from '../beans/ShoppingListItem';
import Header from '../components/Header';
import AddShoppingListItem from '../components/shoppingList/AddShoppingListItem';
import CheckedShoppingListItem from '../components/shoppingList/CheckedShoppingListItem';
import ShoppingListScreenItem from '../components/shoppingList/ShoppingListScreenItem';
import {shoppingListService} from '../config/appConfig';
import styles from './ScreenStyles';
import useShoppingList from '../hooks/useShoppingList';

export default function ShoppingListScreen({navigation}: any) {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [shoppingListItemToEdit, setShoppingListItemToEdit] = useState<ShoppingListItem>(null);
  const [checkedShoppingListItems, setCheckedShoppingListItems] = useState<ShoppingListItem[]>([]);
  const [renderedShoppingList, setRenderedShoppingList] = useState<any>([]);
  const [renderedCheckedShoppingListItems, setRenderedCheckedShoppingListItems] = useState<any>([]);
  const isDarkMode = useDarkMode();
  const shoppingListQuery = useShoppingList();

  async function addShoppingListItem(text: string) {
    try {
      await shoppingListService.addShoppingListItem(new ShoppingListItem(text));
    } catch (error) {
      console.log(error);
    }
  }

  async function checkShoppingListItem(shoppingListItemToCheck: ShoppingListItem) {
    try {
      shoppingListItemToCheck.complete = !shoppingListItemToCheck.complete;
      await shoppingListService.updateShoppingListItem(shoppingListItemToCheck);
    } catch (error) {
      console.log(error);
    }
  }

  async function editShoppingListItem(id: number, text: string) {
    try {
      let shoppingListItemToUpdate: ShoppingListItem = shoppingList.find(s => s.id === id);
      shoppingListItemToUpdate.text = text;
      await shoppingListService.updateShoppingListItem(shoppingListItemToUpdate);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteShoppingListItems(shoppingListItems: ShoppingListItem[]) {
    for (let shoppingListItem of shoppingListItems) {
      await shoppingListService.deleteShoppingListItem(shoppingListItem.id);
    }
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
    if (shoppingListQuery.isSuccess && shoppingListQuery.data) {
      setShoppingList(shoppingListQuery.data.filter(s => !s.complete));
      setCheckedShoppingListItems(shoppingListQuery.data.filter(s => s.complete));
    }
  }, [shoppingListQuery]);

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
          <Text style={isDarkMode ? styles.noItemsTextDark : styles.noItemsText}>No Shopping List</Text>
        </View>
      )}
    </View>
  );
}

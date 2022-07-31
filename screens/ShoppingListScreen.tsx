import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import ShoppingListItem from '../beans/ShoppingListItem';
import Header from '../components/Header';
import AddShoppingListItem from '../components/shoppingList/AddShoppingListItem';
import CheckedShoppingListItem from '../components/shoppingList/CheckedShoppingListItem';
import ShoppingListScreenItem from '../components/shoppingList/ShoppingListScreenItem';
import styles from './ScreenStyles';
import Spinner from 'react-native-loading-spinner-overlay';
import {SHOPPING_LIST_QUERY} from '../hooks/query-cache-names';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {shoppingListService} from '../config/appConfig';

export default function ShoppingListScreen() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [shoppingListItemToEdit, setShoppingListItemToEdit] = useState<ShoppingListItem>({} as ShoppingListItem);
  const [checkedShoppingListItems, setCheckedShoppingListItems] = useState<ShoppingListItem[]>([]);
  const [renderedShoppingList, setRenderedShoppingList] = useState<JSX.Element[]>([]);
  const [renderedCheckedShoppingListItems, setRenderedCheckedShoppingListItems] = useState<JSX.Element[]>([]);

  const isDarkMode = useColorScheme() === 'dark';
  const {data: allShoppingList, isLoading, isSuccess} = useQuery(
    [SHOPPING_LIST_QUERY],
    () => shoppingListService.getShoppingList(),
    {cacheTime: 10000, refetchInterval: 10000},
  );
  const queryClient = useQueryClient();

  async function addShoppingListItem(text: string) {
    queryClient.cancelQueries([SHOPPING_LIST_QUERY]);
    // const oldShoppingList: ShoppingListItem[] = [...shoppingList, ...checkedShoppingListItems];

    try {
      const newShoppingListItem: ShoppingListItem = new ShoppingListItem(text);
      // @ts-ignore
      queryClient.setQueryData([SHOPPING_LIST_QUERY], (old: ShoppingListItem[]) => [newShoppingListItem, ...old]);

      // await shoppingListService.addShoppingListItem(newShoppingListItem);
    } catch (error) {
      // Swallow exception, comment the catch and finally blocks back in to use with a backend.
      // queryClient.setQueryData([SHOPPING_LIST_QUERY], oldShoppingList);
    } finally {
      // queryClient.invalidateQueries([SHOPPING_LIST_QUERY]);
    }
  }

  async function checkShoppingListItem(shoppingListItemToCheck: ShoppingListItem) {
    queryClient.cancelQueries([SHOPPING_LIST_QUERY]);
    // const oldShoppingList: ShoppingListItem[] = [...shoppingList, ...checkedShoppingListItems];
    let shoppingListCopy: ShoppingListItem[] = [...shoppingList];
    let checkedShoppingListCopy: ShoppingListItem[] = [...checkedShoppingListItems];

    try {
      const index: number = shoppingList.findIndex(s => s.id === shoppingListItemToCheck.id);
      shoppingListItemToCheck.complete = !shoppingListItemToCheck.complete;
      shoppingListCopy.splice(index, 1);
      checkedShoppingListCopy.unshift(shoppingListItemToCheck);
      queryClient.setQueryData([SHOPPING_LIST_QUERY], [...shoppingListCopy, ...checkedShoppingListCopy]);

      // await shoppingListService.updateShoppingListItem(shoppingListItemToCheck);
    } catch (error) {
      // Swallow exception, comment the catch and finally blocks back in to use with a backend.
      // queryClient.setQueryData([SHOPPING_LIST_QUERY], oldShoppingList);
    } finally {
      // queryClient.invalidateQueries([SHOPPING_LIST_QUERY]);
    }
  }

  async function editShoppingListItem(id: number, text: string) {
    queryClient.cancelQueries([SHOPPING_LIST_QUERY]);
    // const oldShoppingList: ShoppingListItem[] = [...shoppingList, ...checkedShoppingListItems];
    let shoppingListCopy: ShoppingListItem[] = [...shoppingList];

    try {
      let shoppingListItemToUpdate: ShoppingListItem = shoppingList.find(s => s.id === id)!!;
      const index: number = shoppingList.findIndex(s => s.id === shoppingListItemToUpdate.id);

      shoppingListItemToUpdate.text = text;
      shoppingListCopy.splice(index, 1, shoppingListItemToUpdate);
      queryClient.setQueryData([SHOPPING_LIST_QUERY], [...shoppingListCopy, ...checkedShoppingListItems]);

      // await shoppingListService.updateShoppingListItem(shoppingListItemToUpdate);
    } catch (error) {
      // Swallow exception, comment the catch and finally blocks back in to use with a backend.
      // queryClient.setQueryData([SHOPPING_LIST_QUERY], oldShoppingList);
    } finally {
      queryClient.invalidateQueries([SHOPPING_LIST_QUERY]);
    }
  }

  async function deleteShoppingListItems() {
    queryClient.cancelQueries([SHOPPING_LIST_QUERY]);
    // const oldShoppingList: ShoppingListItem[] = [...shoppingList, ...checkedShoppingListItems];

    try {
      queryClient.setQueryData([SHOPPING_LIST_QUERY], shoppingList);
      // await shoppingListService.deleteCompletedShoppingListItems();
    } catch (error) {
      // Swallow exception, comment the catch and finally blocks back in to use with a backend.
      // queryClient.setQueryData([SHOPPING_LIST_QUERY], oldShoppingList);
    } finally {
      // queryClient.invalidateQueries([SHOPPING_LIST_QUERY]);
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
    if (allShoppingList && isSuccess && !isLoading) {
      setShoppingList(allShoppingList.filter(s => !s.complete));
      setCheckedShoppingListItems(allShoppingList.filter(s => s.complete));
    }
  }, [allShoppingList, isSuccess, isLoading]);

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
      {!isLoading ? (
        <>
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
                      <TouchableOpacity style={styles.completeButton} onPress={deleteShoppingListItems}>
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
        </>
      ) : (
        <Spinner visible={isLoading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
      )}
    </View>
  );
}

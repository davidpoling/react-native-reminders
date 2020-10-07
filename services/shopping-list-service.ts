import axios from 'axios';
import ShoppingListItem from '../beans/ShoppingListItem';
import {SHOPPING_LIST_URL} from './rest-constants';

export default class ShoppingListService {
  /**
   * Get the shopping list.
   *
   * @returns The ShoppingList.
   */
  async getShoppingList(): Promise<ShoppingListItem[]> {
    const response = await axios.get(SHOPPING_LIST_URL);
    return response.data;
  }

  /**
   * Add a new ShoppingListItem.
   *
   * @param shoppingListItem
   * @returns The newly added ShoppingListItem.
   */
  async addShoppingListItem(shoppingListItem: ShoppingListItem, connectionId: string): Promise<ShoppingListItem> {
    const response = await axios.post(SHOPPING_LIST_URL + '?connectionId=' + connectionId, shoppingListItem);
    return response.data;
  }

  /**
   * Update a ShoppingListItem.
   *
   * @param shoppingListItem
   * @returns The newly updated ShoppingListItem.
   */
  async updateShoppingListItem(shoppingListItem: ShoppingListItem, connectionId: string): Promise<ShoppingListItem> {
    const reponse = await axios.put(SHOPPING_LIST_URL + '?connectionId=' + connectionId, shoppingListItem);
    return reponse.data;
  }

  /**
   * Delete a ShoppingListItem, provided the ID.
   *
   * @param shoppingListItemId
   * @returns The deleted ShoppingListItem.
   */
  async deleteShoppingListItem(shoppingListItemId: string, connectionId: string): Promise<ShoppingListItem> {
    const response = await axios.delete(SHOPPING_LIST_URL + '/' + shoppingListItemId + '?connectionId=' + connectionId);
    return response.data;
  }
}

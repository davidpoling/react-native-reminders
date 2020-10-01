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
  async addShoppingListItem(shoppingListItem: ShoppingListItem): Promise<ShoppingListItem> {
    const response = await axios.post(SHOPPING_LIST_URL, shoppingListItem);
    return response.data;
  }

  /**
   * Update a ShoppingListItem.
   *
   * @param shoppingListItem
   * @returns The newly updated ShoppingListItem.
   */
  async updateShoppingListItem(shoppingListItem: ShoppingListItem): Promise<ShoppingListItem> {
    const reponse = await axios.put(SHOPPING_LIST_URL, shoppingListItem);
    return reponse.data;
  }

  /**
   * Delete a ShoppingListItem, provided the ID.
   *
   * @param shoppingListItemId
   * @returns The deleted ShoppingListItem.
   */
  async deleteShoppingListItem(shoppingListItemId: string): Promise<ShoppingListItem> {
    const response = await axios.delete(SHOPPING_LIST_URL + '/' + shoppingListItemId);
    return response.data;
  }
}

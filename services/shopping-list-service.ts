import axios from 'axios';
import ShoppingListItem from '../beans/ShoppingListItem';
import {SHOPPING_LIST_URL} from './rest-constants';

export default class ShoppingListService {
  async getShoppingList(): Promise<ShoppingListItem[]> {
    const response = await axios.get(SHOPPING_LIST_URL);
    return response.data;
  }

  async addShoppingListItem(
    shoppingListItem: ShoppingListItem,
  ): Promise<ShoppingListItem> {
    const response = await axios.post(SHOPPING_LIST_URL, shoppingListItem);
    return response.data;
  }

  async updateShoppingListItem(
    shoppingListItem: ShoppingListItem,
  ): Promise<ShoppingListItem> {
    const reponse = await axios.put(SHOPPING_LIST_URL, shoppingListItem);
    return reponse.data;
  }

  async deleteShoppingListItem(
    shoppingListItemId: string,
  ): Promise<ShoppingListItem> {
    const response = await axios.delete(
      SHOPPING_LIST_URL + '/' + shoppingListItemId,
    );
    return response.data;
  }
}

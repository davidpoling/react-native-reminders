import {useQuery} from 'react-query';
import {shoppingListService} from '../config/appConfig';

const fetchShoppingList = () => shoppingListService.getShoppingList();

export default function useShoppingList() {
  return useQuery('shoppingList', fetchShoppingList, {refetchInterval: 10000, cacheTime: 10000});
}

import {useQuery} from 'react-query';
import {shoppingListService} from '../config/appConfig';
import {SHOPPING_LIST_QUERY} from './query-cache-names';

const fetchShoppingList = () => shoppingListService.getShoppingList();

export default function useShoppingList() {
  return useQuery(SHOPPING_LIST_QUERY, fetchShoppingList, {refetchInterval: 10000, cacheTime: 10000});
}

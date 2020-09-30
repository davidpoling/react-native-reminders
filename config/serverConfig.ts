// REST Services
import RemindersService from '../services/reminders-service';
import ShoppingListService from '../services/shopping-list-service';

const remindersService = new RemindersService();

const shoppingListService = new ShoppingListService();

export {remindersService, shoppingListService};

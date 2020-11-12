import RemindersService from '../services/reminders-service';
import ShoppingListService from '../services/shopping-list-service';

const remindersService = new RemindersService();

const shoppingListService = new ShoppingListService();

let isDarkMode: boolean;

const setIsDarkMode = (darkModeEnabled: boolean) => {
  isDarkMode = darkModeEnabled
}

export {remindersService, shoppingListService, isDarkMode, setIsDarkMode};

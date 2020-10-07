import * as signalR from '@microsoft/signalr';
import RemindersService from '../services/reminders-service';
import {APPLICATION_HUB} from '../services/rest-constants';
import ShoppingListService from '../services/shopping-list-service';

const remindersService = new RemindersService();

const shoppingListService = new ShoppingListService();

const connection = new signalR.HubConnectionBuilder().withUrl(APPLICATION_HUB).build();

let connectionId: string = '';

const setConnectionId = (id: string) => {
  connectionId = id;
};

export {remindersService, shoppingListService, connection, connectionId, setConnectionId};

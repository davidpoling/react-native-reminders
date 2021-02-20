import env from 'react-native-config';

// Reminder
export const REMINDER_URL: string = `${env.REMINDERS_HOST}/api/Reminder`;
export const REMINDER_URL_DELETE_COMPLETED: string = `${REMINDER_URL}/Delete/Completed`;

// Shopping List
export const SHOPPING_LIST_URL: string = `${env.REMINDERS_HOST}/api/ShoppingList`;
export const SHOPPING_LIST_URL_DELETE_COMPLETED: string = `${SHOPPING_LIST_URL}/Delete/Completed`;

// Application Hub
export const APPLICATION_HUB: string = `${env.REMINDERS_HOST}/application-hub`;

import Endpoint from './endpoint';
import {GET_REMINDERS, ADD_REMINDER, DELETE_REMINDER} from './rest-constants';

export default class RemindersService {
  getReminders() {
    return new Endpoint(GET_REMINDERS).get();
  }

  addReminder(reminder) {
    return new Endpoint(ADD_REMINDER).post(reminder);
  }

  deleteReminder(reminderId) {
    return new Endpoint(DELETE_REMINDER).delete(reminderId);
  }
}

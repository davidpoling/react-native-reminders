import Endpoint from './endpoint';
import {REMINDER_URL} from './rest-constants';

export default class RemindersService {
  getReminders() {
    return new Endpoint(REMINDER_URL).get().then(this.processReminder);
  }

  addReminder(reminder) {
    return new Endpoint(REMINDER_URL).post(reminder);
  }

  updateReminder(reminder) {
    return new Endpoint(REMINDER_URL).put(reminder);
  }

  deleteReminder(reminderId) {
    return new Endpoint(REMINDER_URL).delete(reminderId);
  }

  processReminder(reminders) {
    if (Array.isArray(reminders)) {
      return reminders.map((reminder) => {
        reminder.dateTime = new Date(reminder.dateTime);
        return reminder;
      });
    }
  }
}

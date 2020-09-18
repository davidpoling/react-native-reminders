// import Endpoint from './endpoint';
import axios from 'axios';
import {REMINDER_URL} from './rest-constants';

export default class RemindersService {
  getReminders() {
    return axios.get(REMINDER_URL).then(this.processReminder);
  }

  addReminder(reminder) {
    return axios.post(REMINDER_URL, reminder);
  }

  updateReminder(reminder) {
    return axios.put(REMINDER_URL, reminder);
  }

  deleteReminder(reminderId) {
    return axios.delete(REMINDER_URL + '/' + reminderId);
  }

  processReminder(reminders) {
    if (Array.isArray(reminders.data)) {
      return reminders.data.map(reminder => {
        reminder.dateTime = new Date(reminder.dateTime);
        return reminder;
      });
    }
  }
}

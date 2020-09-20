// import Endpoint from './endpoint';
import axios, {AxiosResponse} from 'axios';
import Reminder from '../beans/Reminder';
import {REMINDER_URL} from './rest-constants';

export default class RemindersService {
  getReminders(): Promise<Reminder[]> {
    return axios.get(REMINDER_URL).then(this.processReminder);
  }

  async addReminder(reminder: Reminder): Promise<Reminder> {
    const response = await axios.post(REMINDER_URL, reminder);
    return response.data;
  }

  async updateReminder(reminder: Reminder): Promise<Reminder> {
    const response = await axios.put(REMINDER_URL, reminder);
    return response.data;
  }

  async deleteReminder(reminderId: string): Promise<Reminder> {
    const response = await axios.delete(REMINDER_URL + '/' + reminderId);
    return response.data;
  }

  processReminder(response: AxiosResponse): Reminder[] {
    const reminders = response.data;
    if (Array.isArray(reminders)) {
      return reminders.map(reminder => {
        reminder.dateTime = new Date(reminder.dateTime);
        return reminder;
      });
    }
  }
}

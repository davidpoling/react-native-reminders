// import Endpoint from './endpoint';
import axios, {AxiosResponse} from 'axios';
import Reminder from '../beans/Reminder';
import {REMINDER_URL} from './rest-constants';

export default class RemindersService {
  /**
   * Get a list of all reminders.
   *
   * @returns A list of all reminders.
   */
  async getReminders(): Promise<Reminder[]> {
    const response = await axios.get(REMINDER_URL);
    return this.processReminder(response);
  }

  /**
   * Add a new Reminder.
   *
   * @param reminder
   * @returns The newly added Reminder.
   */
  async addReminder(reminder: Reminder): Promise<Reminder> {
    const response = await axios.post(REMINDER_URL, reminder);
    return response.data;
  }

  /**
   * Update a Reminder.
   *
   * @param reminder
   * @returns The newly updated Reminder.
   */
  async updateReminder(reminder: Reminder): Promise<Reminder> {
    const response = await axios.put(REMINDER_URL, reminder);
    return response.data;
  }

  /**
   * Delete a Reminder, provided the ID.
   *
   * @param reminderId
   * @returns The deleted Reminder's ID.
   */
  async deleteReminder(reminderId: number): Promise<number> {
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

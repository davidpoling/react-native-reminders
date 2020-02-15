class RemindersService {
  constructor() {
    this.reminders = [];
  }

  getReminders() {
    return new Promise((resolve, reject) => {
      if (!this.reminders) {
        reject("Error, null reminders");
      }
      resolve(this.reminders);
    });
  }

  addReminder(reminder) {
    return new Promise((resolve, reject) => {
      if (!this.reminders) {
        reject("Error, null reminders");
      }
      if (this.reminders.indexOf(reminder) !== -1) {
        reject("Error, reminder already exists");
      }
      this.reminders.push(reminder);
      resolve(reminder);
    });
  }

  deleteReminder(reminderId) {
    return new Promise((resolve, reject) => {
      if (!this.reminders) {
        reject("Error, null reminders");
      }
      let index = -1;
      for (let i = 0; i < this.reminders.length; i++) {
        if (this.reminders[i].id === reminderId) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        reject("Could not find reminder with ID: " + reminderId);
      }
      this.reminders.splice(index, 1);
      resolve(reminderId);
    });
  }
}

module.exports = RemindersService;

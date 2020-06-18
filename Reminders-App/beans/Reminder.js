import {uuid} from 'uuidv4';

export default class Reminder {
  constructor(text, dateTime) {
    this.id = uuid();
    this.text = text;
    this.dateTime = dateTime;
    this.dateTimeString = this.generateDateTimeString(this.dateTime);
  }

  generateDateTimeString(dateTime) {
    const dayMonthString = dateTime
      .toString()
      .substring(
        0,
        dateTime.toString().indexOf(dateTime.getFullYear().toString()) - 1,
      );
    const time = moment(dateTime).format('LT');
    return dayMonthString + ' ' + time;
  }
}

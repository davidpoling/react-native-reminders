import moment from 'moment';

export default class Reminder {
  id: string;
  text: string;
  dateTime: Date;
  dateTimeString: string;

  constructor(text, dateTime) {
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

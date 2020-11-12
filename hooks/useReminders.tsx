import {useQuery} from 'react-query';
import {remindersService} from '../config/appConfig';

const fetchReminders = () => remindersService.getReminders();

export default function useReminders() {
  return useQuery('reminders', fetchReminders, {refetchInterval: 10000, cacheTime: 10000});
}

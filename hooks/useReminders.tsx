import {useQuery} from 'react-query';
import {remindersService} from '../config/appConfig';
import {REMINDERS_QUERY} from './query-cache-names';

const fetchReminders = () => remindersService.getReminders();

export default function useReminders() {
  return useQuery(REMINDERS_QUERY, fetchReminders, {refetchInterval: 10000, cacheTime: 10000});
}

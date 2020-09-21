import React, {useState, useContext, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import AddReminder from '../components/reminder/AddReminder';
import RemindersContext from '../context/RemindersContext';
import {remindersService} from '../config/serverConfig';
import Reminder from '../beans/Reminder';
import Header from '../components/Header';
import styles from './ScreenStyles';
import ReminderListItem from '../components/reminder/ReminderListItem';

export default function RemindersScreen({navigation}: any) {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const remindersContext = useContext<any>(RemindersContext);

  useEffect(() => {
    if (reminders) {
      remindersContext.updateReminders(reminders);
    }
  }, [reminders]);

  useEffect(() => {
    remindersService
      .getReminders()
      .then(reminders => {
        setReminders(reminders);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  async function completeReminder(id: string) {
    setTimeout(async () => {
      await remindersService.deleteReminder(id);
      setReminders(prevReminders => {
        return prevReminders.filter(reminder => reminder.id !== id);
      });
    }, 1000);
  }

  async function addReminder(text: string, dateTime: Date) {
    try {
      const newReminder = await remindersService.addReminder(
        new Reminder(text, dateTime),
      );
      setReminders(prevReminders => {
        return [newReminder, ...prevReminders];
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Reminders" />
      <AddReminder addReminder={addReminder} />
      {reminders.length > 0 ? (
        <FlatList
          data={reminders}
          renderItem={({item}) => (
            <ReminderListItem item={item} completeReminder={completeReminder} />
          )}
        />
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No Reminders</Text>
        </View>
      )}
    </View>
  );
}

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddReminder from '../components/reminder/AddReminder';
import {remindersService} from '../config/appConfig';
import Reminder from '../beans/Reminder';
import Header from '../components/Header';
import styles from './ScreenStyles';
import ReminderListItem from '../components/reminder/ReminderListItem';
import moment from 'moment';
import CompletedReminderListItem from '../components/reminder/CompletedReminderListItem';
import {ScrollView} from 'react-native-gesture-handler';
import {useDarkMode} from 'react-native-dynamic';
import useReminders from '../hooks/useReminders';
import {useQueryCache} from 'react-query';
import Spinner from 'react-native-loading-spinner-overlay';

export default function RemindersScreen({navigation}: any) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminderToEdit, setReminderToEdit] = useState<Reminder>(null);
  const [completedReminders, setCompletedReminders] = useState<Reminder[]>([]);
  const [renderedReminders, setRenderedReminders] = useState<any>([]);
  const [renderedCompletedReminders, setRenderedCompletedReminders] = useState<any>([]);
  const isDarkMode = useDarkMode();
  const remindersQuery = useReminders();
  const queryCache = useQueryCache();

  async function addReminder(text: string, dateTime: Date) {
    queryCache.cancelQueries('reminders');
    const oldReminders: Reminder[] = [...reminders, ...completedReminders];

    try {
      const newReminder: Reminder = new Reminder(text, dateTime);
      queryCache.setQueryData('reminders', (old: Reminder[]) => [newReminder, ...old]);

      await remindersService.addReminder(newReminder);
    } catch (error) {
      queryCache.setQueryData('reminders', oldReminders);
    } finally {
      queryCache.invalidateQueries('reminders');
    }
  }

  async function completeReminder(reminderToComplete: Reminder) {
    queryCache.cancelQueries('reminders');
    const oldReminders: Reminder[] = [...reminders, ...completedReminders];
    let remindersCopy: Reminder[] = [...reminders];
    let completedRemindersCopy: Reminder[] = [...completedReminders];

    try {
      const index: number = reminders.findIndex(r => r.id === reminderToComplete.id);
      reminderToComplete.complete = !reminderToComplete.complete;
      remindersCopy.splice(index, 1);
      completedRemindersCopy.unshift(reminderToComplete);
      queryCache.setQueryData('reminders', [...remindersCopy, ...completedRemindersCopy]);

      await remindersService.updateReminder(reminderToComplete);
    } catch (error) {
      setReminders(oldReminders);
      queryCache.setQueryData('reminders', oldReminders);
    } finally {
      queryCache.invalidateQueries('reminders');
    }
  }

  async function editReminder(id: number, text: string, dateTime: Date) {
    queryCache.cancelQueries('reminders');
    const oldReminders: Reminder[] = [...reminders, ...completedReminders];
    let remindersCopy: Reminder[] = [...reminders];

    try {
      let reminderToUpdate: Reminder = reminders.find(r => r.id === id);
      const index: number = reminders.findIndex(r => r.id === reminderToUpdate.id);

      reminderToUpdate.text = text;
      reminderToUpdate.dateTime = dateTime;
      reminderToUpdate.dateTimeString = generateDateTimeString(dateTime);
      remindersCopy.splice(index, 1, reminderToUpdate);
      queryCache.setQueryData('reminders', [...remindersCopy, ...completedReminders]);

      await remindersService.updateReminder(reminderToUpdate);
    } catch (error) {
      queryCache.setQueryData('reminders', oldReminders);
    } finally {
      queryCache.invalidateQueries('reminders');
    }
  }

  async function deleteReminders() {
    queryCache.cancelQueries('reminders');
    const oldReminders: Reminder[] = [...reminders, ...completedReminders];

    try {
      queryCache.setQueryData('reminders', reminders);
      for (let reminder of completedReminders) {
        await remindersService.deleteReminder(reminder.id);
      }
    } catch (error) {
      queryCache.setQueryData('reminders', oldReminders);
    } finally {
      queryCache.invalidateQueries('reminders');
    }
  }

  function onEditPressed(reminder: Reminder) {
    setReminderToEdit(reminder);
  }

  function generateDateTimeString(dateTime: Date): string {
    const dayMonthString = dateTime
      .toString()
      .substring(0, dateTime.toString().indexOf(dateTime.getFullYear().toString()) - 1);
    const time = moment(dateTime).format('LT');
    return dayMonthString + ' ' + time;
  }

  function renderReminders() {
    let renderedItems: any = [];

    reminders.forEach(item => {
      renderedItems.push(
        <ReminderListItem
          key={item.id}
          item={item}
          completeReminder={completeReminder}
          onEditPressed={onEditPressed}
        />,
      );
    });

    setRenderedReminders(renderedItems);
  }

  function renderCompletedReminders() {
    let renderedItems: any = [];

    completedReminders.forEach(item => {
      renderedItems.push(<CompletedReminderListItem key={item.id} item={item} />);
    });

    setRenderedCompletedReminders(renderedItems);
  }

  useEffect(() => {
    if (remindersQuery.isSuccess && remindersQuery.data) {
      setReminders(remindersQuery.data.filter(r => !r.complete));
      setCompletedReminders(remindersQuery.data.filter(r => r.complete));
    }
  }, [remindersQuery]);

  useEffect(() => {
    if (reminders.length > 0) {
      renderReminders();
    }
  }, [reminders]);

  useEffect(() => {
    if (completedReminders.length > 0) {
      renderCompletedReminders();
    }
  }, [completedReminders]);

  return (
    <View style={styles.container}>
      <Header title="Reminders" />
      <AddReminder
        addReminder={addReminder}
        reminderToEdit={reminderToEdit}
        setReminderToEdit={setReminderToEdit}
        editReminder={editReminder}
      />
      {!remindersQuery.isLoading ? (
        <>
          {reminders.length > 0 || completedReminders.length > 0 ? (
            <>
              <ScrollView>
                <>
                  {reminders.length > 0 && <>{renderedReminders}</>}

                  {completedReminders.length > 0 && (
                    <>
                      <View style={styles.dividerContainer}>
                        <Text style={styles.dividerCompleteText}>Complete</Text>
                        <View style={styles.divider} />
                      </View>
                      <TouchableOpacity style={styles.completeButton} onPress={deleteReminders}>
                        <Icon name="ios-trash-outline" size={20} style={styles.completeIcon} />
                      </TouchableOpacity>
                      <>{renderedCompletedReminders}</>
                    </>
                  )}
                </>
              </ScrollView>
            </>
          ) : (
            <View style={styles.noItemsContainer}>
              <Text style={isDarkMode ? styles.noItemsTextDark : styles.noItemsText}>No Reminders</Text>
            </View>
          )}
        </>
      ) : (
        <Spinner visible={remindersQuery.isLoading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
      )}
    </View>
  );
}

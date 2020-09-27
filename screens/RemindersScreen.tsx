import React, {useState, useContext, useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddReminder from '../components/reminder/AddReminder';
import RemindersContext from '../context/RemindersContext';
import {remindersService} from '../config/serverConfig';
import Reminder from '../beans/Reminder';
import Header from '../components/Header';
import styles from './ScreenStyles';
import ReminderListItem from '../components/reminder/ReminderListItem';
import moment from 'moment';
import CompletedReminderListItem from '../components/reminder/CompletedReminderListItem';

export default function RemindersScreen({navigation}: any) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminderToEdit, setReminderToEdit] = useState<Reminder>(null);
  const [completedReminders, setCompletedReminders] = useState<Reminder[]>([]);

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
        setReminders(reminders.filter(r => !r.complete));
        setCompletedReminders(reminders.filter(r => r.complete));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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

  async function completeReminder(reminderToComplete: Reminder) {
    try {
      reminderToComplete.complete = !reminderToComplete.complete;
      const updatedReminder: Reminder = await remindersService.updateReminder(
        reminderToComplete,
      );
      setReminders(prevReminders => {
        return prevReminders.filter(
          reminder => reminder.id !== updatedReminder.id,
        );
      });
      setCompletedReminders(prevReminders => {
        return [updatedReminder, ...prevReminders];
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function editReminder(id: string, text: string, dateTime: Date) {
    try {
      let reminderToUpdate: Reminder = reminders.find(r => r.id === id);
      reminderToUpdate.text = text;
      reminderToUpdate.dateTime = dateTime;
      reminderToUpdate.dateTimeString = generateDateTimeString(dateTime);
      const updatedReminder: Reminder = await remindersService.updateReminder(
        reminderToUpdate,
      );
      let prevReminders: Reminder[] = reminders.slice();
      prevReminders.splice(
        prevReminders.indexOf(reminderToUpdate),
        1,
        updatedReminder,
      );
      setReminders(prevReminders);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteReminders(remindersToDelete: Reminder[]) {
    for (let reminder of remindersToDelete) {
      await remindersService.deleteReminder(reminder.id);
    }
    setCompletedReminders([]);
  }

  function onEditPressed(reminder: Reminder) {
    setReminderToEdit(reminder);
  }

  function generateDateTimeString(dateTime: Date): string {
    const dayMonthString = dateTime
      .toString()
      .substring(
        0,
        dateTime.toString().indexOf(dateTime.getFullYear().toString()) - 1,
      );
    const time = moment(dateTime).format('LT');
    return dayMonthString + ' ' + time;
  }

  return (
    <View style={styles.container}>
      <Header title="Reminders" />
      <AddReminder
        addReminder={addReminder}
        reminderToEdit={reminderToEdit}
        setReminderToEdit={setReminderToEdit}
        editReminder={editReminder}
      />
      {reminders.length > 0 || completedReminders.length > 0 ? (
        <>
          {reminders.length > 0 && (
            <FlatList
              data={reminders}
              renderItem={({item}) => (
                <ReminderListItem
                  item={item}
                  completeReminder={completeReminder}
                  onEditPressed={onEditPressed}
                />
              )}
            />
          )}

          {completedReminders.length > 0 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                  marginTop: 5,
                }}>
                <Text style={{color: '#828282', marginLeft: 10}}>Complete</Text>
                <View
                  style={{
                    borderWidth: 0.75,
                    borderColor: '#D9E0E3',
                    margin: 5,
                    width: '80%',
                    height: 0,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3399ff',
                  padding: 5,
                  margin: 5,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  width: '20%',
                  borderRadius: 100,
                }}
                onPress={() => deleteReminders(completedReminders)}>
                <Icon
                  name="ios-trash-outline"
                  size={20}
                  style={{color: 'white'}}
                />
              </TouchableOpacity>
              <FlatList
                data={completedReminders}
                renderItem={({item}) => (
                  <CompletedReminderListItem item={item} />
                )}
              />
            </>
          )}
        </>
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No Reminders</Text>
        </View>
      )}
    </View>
  );
}

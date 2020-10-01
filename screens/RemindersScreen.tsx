import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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
import {ScrollView} from 'react-native-gesture-handler';

export default function RemindersScreen({navigation}: any) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminderToEdit, setReminderToEdit] = useState<Reminder>(null);
  const [completedReminders, setCompletedReminders] = useState<Reminder[]>([]);
  const [renderedReminders, setRenderedReminders] = useState<any>([]);
  const [renderedCompletedReminders, setRenderedCompletedReminders] = useState<any>([]);

  const remindersContext = useContext<any>(RemindersContext);

  async function addReminder(text: string, dateTime: Date) {
    try {
      const newReminder = await remindersService.addReminder(new Reminder(text, dateTime));
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
      const updatedReminder: Reminder = await remindersService.updateReminder(reminderToComplete);
      setReminders(prevReminders => {
        return prevReminders.filter(reminder => reminder.id !== updatedReminder.id);
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
      const updatedReminder: Reminder = await remindersService.updateReminder(reminderToUpdate);
      let prevReminders: Reminder[] = reminders.slice();
      prevReminders.splice(prevReminders.indexOf(reminderToUpdate), 1, updatedReminder);
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
    const dayMonthString = dateTime.toString().substring(0, dateTime.toString().indexOf(dateTime.getFullYear().toString()) - 1);
    const time = moment(dateTime).format('LT');
    return dayMonthString + ' ' + time;
  }

  function renderReminders() {
    let renderedItems: any = [];

    reminders.forEach(item => {
      renderedItems.push(<ReminderListItem key={item.id} item={item} completeReminder={completeReminder} onEditPressed={onEditPressed} />);
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

  // TODO: This is OBE now, but I'm keeping it in here for reference using with context.
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
      <AddReminder addReminder={addReminder} reminderToEdit={reminderToEdit} setReminderToEdit={setReminderToEdit} editReminder={editReminder} />
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
                  <TouchableOpacity style={styles.completeButton} onPress={() => deleteReminders(completedReminders)}>
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
          <Text style={styles.noItemsText}>No Reminders</Text>
        </View>
      )}
    </View>
  );
}

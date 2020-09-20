import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import ListItem from '../components/ListItem';
import AddReminder from '../components/AddReminder';
import RemindersContext from '../context/RemindersContext';
import {remindersService} from '../config/serverConfig';
import Reminder from '../beans/Reminder';
import Header from '../components/Header';

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    screenButton: {
      backgroundColor: '#3399ff',
      padding: 5,
      margin: 5,
    },
    screenButtonText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
    },
    noRemindersText: {
      fontSize: 18,
    },
    noRemindersContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Header title="Reminders" />
      <AddReminder addReminder={addReminder} />
      {reminders.length > 0 ? (
        <FlatList
          data={reminders}
          renderItem={({item}) => (
            <ListItem item={item} completeReminder={completeReminder} />
          )}
        />
      ) : (
        <View style={styles.noRemindersContainer}>
          <Text style={styles.noRemindersText}>No Reminders</Text>
        </View>
      )}
    </View>
  );
}
import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {uuid} from 'uuidv4';
import ListItem from '../components/ListItem';
import AddReminder from '../components/AddReminder';
import RemindersContext from '../context/RemindersContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {remindersService} from '../config/serverConfig';
import moment from 'moment';
import Reminder from '../beans/Reminder';

export default (RemindersScreen = ({navigation}) => {
  const [reminders, setReminders] = useState([]);

  const remindersContext = useContext(RemindersContext);

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

  async function completeReminder(id) {
    setTimeout(async () => {
      await remindersService.deleteReminder(id);
      setReminders(prevReminders => {
        return prevReminders.filter(reminder => reminder.id !== id);
      });
    }, 1000);
  }

  async function addReminder(text, dateTime) {
    const newReminder = new Reminder(text, dateTime);
    try {
      await remindersService.addReminder(newReminder);
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

      <TouchableOpacity
        style={styles.screenButton}
        onPress={() => {
          navigation.navigate('Calendar Screen');
        }}>
        <Text style={styles.screenButtonText}>
          <Icon name="calendar" size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
});

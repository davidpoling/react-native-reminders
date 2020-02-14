import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {uuid} from 'uuidv4';
import ListItem from '../components/ListItem';
import AddReminder from '../components/AddReminder';
import RemindersContext from '../context/RemindersContext';

export default RemindersScreen = ({navigation}) => {
  const [reminders, setReminders] = useState([
    {id: uuid(), text: 'Drink Coffee', dateTime: new Date()},
    {id: uuid(), text: 'Peel Eggs', dateTime: new Date()},
    {id: uuid(), text: 'Get Mail', dateTime: new Date()},
    {id: uuid(), text: 'Get dinner ingredients', dateTime: new Date()},
  ]);

  const remindersContext = useContext(RemindersContext);

  useEffect(() => {
    if (reminders && reminders.length > 0) {
      remindersContext.updateReminders(reminders);
    }
  }, [reminders]);

  function completeReminder(id) {
    setTimeout(() => {
      setReminders(prevReminders => {
        return prevReminders.filter(reminder => reminder.id !== id);
      });
    }, 1000);
  }

  function addReminder(text, dateTime) {
    setReminders(prevReminders => {
      return [{id: uuid(), text: text, dateTime: dateTime}, ...prevReminders];
    });
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <AddReminder addReminder={addReminder} />
      <FlatList
        data={reminders}
        renderItem={({item}) => (
          <ListItem item={item} completeReminder={completeReminder} />
        )}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Calendar Screen');
        }}>
        <Text>To Calendar Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

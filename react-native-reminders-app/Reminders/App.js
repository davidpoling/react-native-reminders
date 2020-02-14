import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {uuid} from 'uuidv4';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddReminder from './components/AddReminder';

export default App = () => {
  const [reminders, setReminders] = useState([
    {id: uuid(), text: 'Drink Coffee', dateTime: new Date()},
    {id: uuid(), text: 'Peel Eggs', dateTime: new Date()},
    {id: uuid(), text: 'Get Mail', dateTime: new Date()},
    {id: uuid(), text: 'Get dinner ingredients', dateTime: new Date()},
  ]);

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
      <Header title="Reminders" />
      <AddReminder addReminder={addReminder} />
      <FlatList
        data={reminders}
        renderItem={({item}) => (
          <ListItem item={item} completeReminder={completeReminder} />
        )}
      />
    </View>
  );
};

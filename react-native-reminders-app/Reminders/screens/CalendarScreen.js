import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Calendar, Agenda} from 'react-native-calendars';
import RemindersContext from '../context/RemindersContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default CalendarScreen = ({navigation}) => {
  const [reminders, setReminders] = useState({});
  const [calendarItems, setCalendarItems] = useState({
    '2020-02-14': [{name: 'Random Date'}],
    '2020-02-15': [{name: 'Anotha One'}],
    '2020-03-10': [{name: 'Example'}],
  });
  const remindersContext = useContext(RemindersContext);

  useEffect(() => {
    const currentReminders = remindersContext.reminders;
    if (currentReminders) {
      setReminders(currentReminders);
    }
  }, [remindersContext]);

  function renderItem(item) {
    return (
      <TouchableOpacity style={styles.item}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  function renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is an empty date!</Text>
      </View>
    );
  }

  function renderEmptyData() {
    return <View />;
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
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30,
    },
  });

  return (
    <View style={styles.container}>
      <Agenda
        items={calendarItems}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        renderEmptyData={renderEmptyData}
      />
      <TouchableOpacity
        style={styles.screenButton}
        onPress={() => {
          navigation.navigate('Reminders Screen');
        }}>
        <Text style={styles.screenButtonText}>
          <Icon name="list" size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';
import RemindersContext from '../context/RemindersContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default CalendarScreen = ({navigation}) => {
  const [calendarItems, setCalendarItems] = useState({});
  const remindersContext = useContext(RemindersContext);

  useEffect(() => {
    const reminders = remindersContext.reminders;
    if (reminders && reminders.length > 0) {
      setCalendarItems(generateCalendarItems(reminders));
    }
  }, [remindersContext]);

  function generateCalendarItems(reminders) {
    let newCalendarItems = {};

    reminders.forEach(reminder => {
      const key = generateDateKeyFromDateTime(reminder.dateTime);
      if (newCalendarItems[key]) {
        newCalendarItems[key].push({name: getFormattedReminderText(reminder)});
      } else {
        newCalendarItems[key] = [{name: getFormattedReminderText(reminder)}];
      }
    });

    return newCalendarItems;
  }

  function generateDateKeyFromDateTime(dateTime) {
    const year = dateTime.getFullYear();
    const day = dateTime.getDate();
    let month = dateTime.getMonth() + 1;

    // If the month is < 10, add a prefixed zero.
    // The <Agenda /> component cannot read months without a prefixed zero.
    if (month < 10) {
      month = '0' + month;
    }

    return year + '-' + month + '-' + day;
  }

  function getFormattedReminderText(reminder) {
    return reminder.text + ' - ' + reminder.dateTimeString;
  }

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
        selected={generateDateKeyFromDateTime(new Date())}
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

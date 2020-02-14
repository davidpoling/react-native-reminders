import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import RemindersContext from '../context/RemindersContext';

export default CalendarScreen = ({navigation}) => {
  const [reminders, setReminders] = useState([]);
  const remindersContext = useContext(RemindersContext);

  useEffect(() => {
    const currentReminders = remindersContext.reminders;
    if (currentReminders) {
      setReminders(currentReminders);
    }
  }, [remindersContext]);

  return (
    <View>
      <Calendar></Calendar>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Reminders Screen');
        }}>
        <Text>To Reminders Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DatePicker from 'react-native-date-picker';

export default AddReminder = ({addReminder}) => {
  const [text, setText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  function onChange(textValue) {
    setText(textValue);
  }

  function onDateChange(newDate) {
    setDateTime(newDate);
  }

  function onAddPress() {
    addReminder(text, dateTime);
    setText('');
  }

  const styles = StyleSheet.create({
    input: {
      height: 60,
      padding: 8,
      fontSize: 16,
    },
    addButton: {
      backgroundColor: '#314b7f',
      padding: 9,
      margin: 5,
    },
    addButtonText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
    },
  });

  return (
    <View>
      <TextInput
        placeholder="Add New Reminder"
        style={styles.input}
        onChangeText={onChange}
        value={text}
      />
      <Button
        onPress={() => setShowDatePicker(!showDatePicker)}
        title={'Show/Hide Date Picker'}
      />
      {showDatePicker && (
        <DatePicker date={dateTime} onDateChange={onDateChange} />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddPress}
        disabled={!text}>
        <Text style={styles.addButtonText}>
          <Icon name="plus" size={20} />
          Add New Reminder
        </Text>
      </TouchableOpacity>
    </View>
  );
};

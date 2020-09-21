import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';

export default function AddReminder({addReminder}: any) {
  const [text, setText] = useState<string>('');
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addButtonEnabled, setAddButtonEnabled] = useState<boolean>(false);

  function onChange(textValue: string) {
    setText(textValue);
    setAddButtonEnabled(textValue !== '' ? true : false);
  }

  function onDateChange(newDate: Date) {
    setDateTime(newDate);
  }

  function onAddNewPress() {
    setModalVisible(true);
  }

  function onAddPress() {
    addReminder(text, dateTime);
    setText('');
    setModalVisible(false);
    setAddButtonEnabled(false);
  }

  const styles = StyleSheet.create({
    input: {
      height: 75,
      padding: 8,
      fontSize: 18,
      marginBottom: 20,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
    addNewButton: {
      backgroundColor: '#3399ff',
      padding: 5,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    addNewButtonIcon: {
      color: 'white',
      marginRight: 15,
    },
    addNewButtonText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
    },
    modalButtonText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
      width: 100,
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    modalButton: {
      backgroundColor: '#3399ff',
      padding: 9,
      margin: 5,
      marginTop: 20,
    },
    datePicker: {
      width: 420,
    },
    modalButtonDisabled: {
      backgroundColor: 'lightgray',
      padding: 9,
      margin: 5,
      marginTop: 20,
    },
  });

  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <TextInput
          placeholder="Add New Reminder"
          style={styles.input}
          onChangeText={onChange}
          value={text}
        />
        <DatePicker
          style={styles.datePicker}
          date={dateTime}
          onDateChange={onDateChange}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              addButtonEnabled ? styles.modalButton : styles.modalButtonDisabled
            }
            onPress={onAddPress}
            disabled={!addButtonEnabled}>
            <Text style={styles.modalButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity style={styles.addNewButton} onPress={onAddNewPress}>
        <Icon name="plus" size={20} style={styles.addNewButtonIcon} />
        <Text style={styles.addNewButtonText}>Add New Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

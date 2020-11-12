import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import styles from '../AddItemStyles';
import {useDarkMode} from 'react-native-dynamic';

export default function AddReminder({addReminder, reminderToEdit, setReminderToEdit, editReminder}: any) {
  const [text, setText] = useState<string>('');
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addButtonEnabled, setAddButtonEnabled] = useState<boolean>(false);
  const isDarkMode = useDarkMode();

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
    clear();
  }

  function onEditPress() {
    editReminder(reminderToEdit.id, text, dateTime);
    clear();
  }

  function clear() {
    setText('');
    setModalVisible(false);
    setAddButtonEnabled(false);
    setReminderToEdit({});
  }

  useEffect(() => {
    if (reminderToEdit && reminderToEdit.id) {
      setText(reminderToEdit.text);
      setDateTime(reminderToEdit.dateTime);
      setModalVisible(true);
      setAddButtonEnabled(true);
    }
  }, [reminderToEdit]);

  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={isDarkMode ? styles.modalContainerDark : styles.modalContainer}>
          <TextInput
            placeholder="Add New Reminder"
            style={isDarkMode ? styles.inputDark : styles.input}
            onChangeText={onChange}
            value={text}
            autoFocus
          />
          <DatePicker
            style={styles.datePicker}
            date={dateTime}
            onDateChange={onDateChange}
            textColor={isDarkMode ? 'white' : 'black'}
          />
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.modalButton} onPress={clear}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={addButtonEnabled ? styles.modalButton : styles.modalButtonDisabled}
              onPress={() => (reminderToEdit && reminderToEdit.id ? onEditPress() : onAddPress())}
              disabled={!addButtonEnabled}>
              <Text style={styles.modalButtonText}>{reminderToEdit && reminderToEdit.id ? 'Edit' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.addNewButton} onPress={onAddNewPress}>
        <Icon name="plus" size={20} style={styles.addNewButtonIcon} />
        <Text style={styles.addNewButtonText}>Add New Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

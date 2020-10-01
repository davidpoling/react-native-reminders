import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../AddItemStyles';

export default function AddShoppingListItem({addShoppingListItem, shoppingListItemToEdit, setShoppingListItemToEdit, editShoppingListItem}: any) {
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addButtonEnabled, setAddButtonEnabled] = useState<boolean>(false);

  function onChange(textValue: string) {
    setText(textValue);
    setAddButtonEnabled(textValue !== '' ? true : false);
  }

  function onAddNewPress() {
    setModalVisible(true);
  }

  function onAddPress() {
    addShoppingListItem(text);
    setText('');
    setModalVisible(false);
    setAddButtonEnabled(false);
  }

  function onEditPress() {
    editShoppingListItem(shoppingListItemToEdit.id, text);
    clear();
  }

  function clear() {
    setText('');
    setModalVisible(false);
    setAddButtonEnabled(false);
    setShoppingListItemToEdit({});
  }

  useEffect(() => {
    if (shoppingListItemToEdit && shoppingListItemToEdit.id) {
      setText(shoppingListItemToEdit.text);
      setModalVisible(true);
      setAddButtonEnabled(true);
    }
  }, [shoppingListItemToEdit]);

  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <TextInput placeholder="Add New Shopping List Item" style={styles.input} onChangeText={onChange} value={text} />
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={addButtonEnabled ? styles.modalButton : styles.modalButtonDisabled}
            onPress={() => (shoppingListItemToEdit && shoppingListItemToEdit.id ? onEditPress() : onAddPress())}
            disabled={!addButtonEnabled}>
            <Text style={styles.modalButtonText}>{shoppingListItemToEdit && shoppingListItemToEdit.id ? 'Edit' : 'Add'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity style={styles.addNewButton} onPress={onAddNewPress}>
        <Icon name="plus" size={20} style={styles.addNewButtonIcon} />
        <Text style={styles.addNewButtonText}>Add New Shopping List Item</Text>
      </TouchableOpacity>
    </View>
  );
}

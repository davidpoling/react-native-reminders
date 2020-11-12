import React, {useState} from 'react';
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default function SpecialModal(props: any) {
  const [modalText, setModalText] = useState<string>('Hey there...');
  const [buttonText, setButtonText] = useState<string>('I have a very important question to ask you...');

  return (
    <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modalText}</Text>

          <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              props.setModalVisible(!props.modalVisible);
            }}>
            <Text style={styles.textStyle}>{buttonText}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#3399ff',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

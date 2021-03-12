import React, {useState} from 'react';
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function SpecialModal(props: any) {
  const initialModalText = 'Hey baby, I have something very important to say to you...';
  const initialButtonText = 'What could it be you ask?';
  const [modalText, setModalText] = useState<string>(initialModalText);
  const [buttonText, setButtonText] = useState<string>(initialButtonText);
  const [buttonPressCount, setButtonPressCount] = useState<number>(0);
  const [isPropsing, setIsProposing] = useState<boolean>(false);

  function handleButtonPress() {
    let count = buttonPressCount;
    switch (count) {
      case 0:
        setModalText(
          "Well to start off, you and I have been through so much. I can't believe how happy you've made me...",
        );
        setButtonText('Lara Paige...');
        count++;
        break;
      case 1:
        setModalText('I swear on my life, that I will always love and respect you with every breath,');
        setButtonText('And I swear to you...');
        count++;
        break;
      case 2:
        setModalText('That there is no one else in this world that I would spend my life with,');
        setButtonText('and that you will always come first...');
        count++;
        break;
      case 3:
        setModalText('I promise to always be by your side, through Heaven and Earth,');
        setButtonText('and I promise to be your person. The man of your dreams...');
        count++;
        break;
      case 4:
        setModalText('I love you honey bunches of oats and lotsa motsa.');
        setButtonText('Lara Paige...');
        count++;
        break;
      case 5:
        setModalText('Will you marry me?');
        count++;
        setIsProposing(true);
        break;
      case 6:
        props.setModalVisible(false);
        setModalText(initialModalText);
        setButtonText(initialButtonText);
        count = 0;
        break;
    }

    setButtonPressCount(count);
  }

  function handleYesButtonPress() {
    setModalText('YAY!!');
    setButtonText(':)');
    setIsProposing(false);
  }

  function handleNoButtonPress() {
    setModalText(':( Sad');
    setButtonText(':(');
    setIsProposing(false);
  }

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            {!isPropsing ? (
              <TouchableHighlight style={styles.button} onPress={() => handleButtonPress()}>
                <Text style={styles.textStyle}>{buttonText}</Text>
              </TouchableHighlight>
            ) : (
              <View style={styles.decisionButtonContainer}>
                <TouchableHighlight style={styles.button} onPress={() => handleYesButtonPress()}>
                  <Text style={styles.textStyle}>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => handleNoButtonPress()}>
                  <Text style={styles.textStyle}>No</Text>
                </TouchableHighlight>
              </View>
            )}
          </View>
        </View>
      </Modal>
      {props.modalVisible && <ConfettiCannon count={200} origin={{x: -10, y: 0}} fadeOut fallSpeed={5000} />}
    </>
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
  button: {
    backgroundColor: '#3399ff',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    marginHorizontal: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  decisionButtonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

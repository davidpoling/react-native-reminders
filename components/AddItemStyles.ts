import {StyleSheet} from 'react-native';

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
    borderRadius: 100,
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
    borderRadius: 100,
  },
  datePicker: {
    width: 420,
  },
  modalButtonDisabled: {
    backgroundColor: 'lightgray',
    padding: 9,
    margin: 5,
    marginTop: 20,
    borderRadius: 100,
  },
});

export default styles;

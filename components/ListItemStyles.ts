import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
  },
  listItemDark: {
    padding: 15,
    backgroundColor: 'black',
  },
  listItemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
    maxWidth: 200,
  },
  listItemTextDark: {
    fontSize: 18,
    color: 'white',
    maxWidth: 200,
  },
  listItemStrikeThroughText: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  listItemStrikeThroughTextDark: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'white',
  },
  listItemTextView: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  editText: {
    alignSelf: 'flex-end',
  },
  editTextDark: {
    alignSelf: 'flex-end',
    color: 'white',
  },
});

export default styles;

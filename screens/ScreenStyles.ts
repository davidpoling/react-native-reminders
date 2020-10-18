import {StyleSheet} from 'react-native';
import { isDarkMode } from '../config/appConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  dividerCompleteText: {
    color: '#828282',
    marginLeft: 10,
  },
  divider: {
    borderWidth: 0.75,
    borderColor: '#D9E0E3',
    margin: 5,
    width: '80%',
    height: 0,
  },
  completeButton: {
    backgroundColor: '#3399ff',
    padding: 5,
    margin: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: '20%',
    borderRadius: 100,
  },
  completeIcon: {
    color: 'white',
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
  noItemsText: {
    fontSize: 18,
    color: 'black'
  },
  noItemsTextDark: {
    fontSize: 18,
    color: 'white'
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

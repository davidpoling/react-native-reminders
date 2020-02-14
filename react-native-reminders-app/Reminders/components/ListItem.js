import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default ListItem = ({item, completeReminder}) => {
  const [dateTimeString, setDateTimeString] = useState('');
  const [iconName, setIconName] = useState('circle');
  const [iconColor, setIconColor] = useState('firebrick');

  useEffect(() => {
    if (item.dateTime) {
      const dayMonthString = item.dateTime
        .toString()
        .substring(
          0,
          item.dateTime
            .toString()
            .indexOf(item.dateTime.getFullYear().toString()) - 1,
        );
      const time = item.dateTime.toLocaleTimeString();
      setDateTimeString(dayMonthString + ' ' + time);
    }
  }, [item]);

  function iconPressed() {
    setIconName('check');
    setIconColor('green');
    completeReminder(item.id);
  }

  const styles = StyleSheet.create({
    listItem: {
      padding: 15,
      backgroundColor: '#f8f8f8',
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    listItemView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listItemText: {
      fontSize: 18,
    },
    listReminderDateView: {
      flexDirection: 'column',
    },
  });

  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <View style={styles.listReminderDateView}>
          <Text style={styles.listItemText}>{item.text}</Text>
          <Text style={styles.listItemText}>{dateTimeString}</Text>
        </View>
        <Icon
          name={iconName}
          size={20}
          color={iconColor}
          onPress={iconPressed}
        />
      </View>
    </TouchableOpacity>
  );
};

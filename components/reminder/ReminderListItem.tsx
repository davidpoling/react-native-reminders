import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ReminderListItem({item, completeReminder}: any) {
  const [iconName, setIconName] = useState<string>('circle-thin');

  function iconPressed() {
    setIconName('circle');
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
          <Text style={styles.listItemText}>{item.dateTimeString}</Text>
        </View>
        <Icon
          name={iconName}
          size={20}
          color={'#3399ff'}
          onPress={iconPressed}
        />
      </View>
    </TouchableOpacity>
  );
}

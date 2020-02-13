import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default ListItem = ({item, deleteReminder}) => {
  const [dateTimeString, setDateTimeString] = useState('');

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
  });

  useEffect(() => {
    if (item.dateTime) {
      setDateTimeString(item.dateTime.toLocaleString());
    }
  }, [item]);

  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.text}</Text>
        {/* <Text style={styles.listItemText}>{dateTimeString}</Text> */}
        <Icon
          name="remove"
          size={20}
          color="firebrick"
          onPress={() => deleteReminder(item.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CheckedShoppingListItem({item}: any) {
  const [iconName, setIconName] = useState<string>('circle');

  const styles = StyleSheet.create({
    listItem: {
      padding: 15,
      backgroundColor: '#f8f8f8',
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    listItemView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    listItemText: {
      fontSize: 18,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
    },
    listReminderDateView: {
      flexDirection: 'column',
      marginLeft: 20,
    },
    editText: {
      alignSelf: 'flex-end',
    },
  });

  return (
    <TouchableOpacity style={styles.listItem}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View style={styles.listItemView}>
          <Icon name={iconName} size={25} color={'#3399ff'} />
          <View style={styles.listReminderDateView}>
            <Text style={styles.listItemText}>{item.text}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

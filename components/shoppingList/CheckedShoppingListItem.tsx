import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../ListItemStyles';

export default function CheckedShoppingListItem({item}: any) {
  const [iconName, setIconName] = useState<string>('circle');

  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemContainer}>
        <View style={styles.listItemView}>
          <Icon name={iconName} size={25} color={'#3399ff'} />
          <View style={styles.listItemTextView}>
            <Text style={styles.listItemStrikeThroughText}>{item.text}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

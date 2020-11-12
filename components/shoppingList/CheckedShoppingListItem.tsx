import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../ListItemStyles';

export default function CheckedShoppingListItem({item}: any) {
  const [iconName, setIconName] = useState<string>('circle');
  const isDarkMode = useDarkMode();

  return (
    <TouchableOpacity style={isDarkMode ? styles.listItemDark : styles.listItem}>
      <View style={styles.listItemContainer}>
        <View style={styles.listItemView}>
          <Icon name={iconName} size={25} color={'#3399ff'} />
          <View style={styles.listItemTextView}>
            <Text style={isDarkMode ? styles.listItemStrikeThroughTextDark : styles.listItemStrikeThroughText}>
              {item.text}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

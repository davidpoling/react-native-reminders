import React, {useState} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../ListItemStyles';

export default function CompletedReminderListItem({item}: any) {
  const [iconName, setIconName] = useState<string>('circle');
  const isDarkMode = useDarkMode();

  return (
    <TouchableHighlight style={isDarkMode ? styles.listItemDark : styles.listItem}>
      <View style={styles.listItemContainer}>
        <View style={styles.listItemView}>
          <Icon name={iconName} size={25} color={'#3399ff'} />
          <View style={styles.listItemTextView}>
            <Text style={isDarkMode ? styles.listItemStrikeThroughTextDark : styles.listItemStrikeThroughText}>
              {item.text}
            </Text>
            <Text style={isDarkMode ? styles.listItemStrikeThroughTextDark : styles.listItemStrikeThroughText}>
              {item.dateTimeString}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

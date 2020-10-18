import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isDarkMode} from '../../config/appConfig';
import styles from '../ListItemStyles';

export default function ShoppingListScreenItem({item, checkShoppingListItem, onEditPressed}: any) {
  const [iconName, setIconName] = useState<string>('circle-thin');

  function iconPressed() {
    setIconName('circle');
    checkShoppingListItem(item);
  }

  return (
    <TouchableOpacity style={isDarkMode ? styles.listItemDark : styles.listItem}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View style={styles.listItemView}>
          <Icon name={iconName} size={25} color={'#3399ff'} onPress={iconPressed} />
          <View style={styles.listItemTextView}>
            <Text style={isDarkMode ? styles.listItemTextDark : styles.listItemText}>{item.text}</Text>
          </View>
        </View>
        <View>
          <Text style={isDarkMode ? styles.editTextDark : styles.editText} onPress={() => onEditPressed(item)}>
            Edit
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

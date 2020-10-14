import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Platform} from 'react-native';

export default function Header({title}: any) {
  const styles = StyleSheet.create({
    header: {
      height: 60,
      padding: 15,
    },
    iosheader: {
      height: 90,
      padding: 15,
      paddingTop: 45,
    },
    text: {
      color: '#314b7f',
      fontSize: 23,
      fontWeight: 'bold',
    },
  });

  return (
    // Because iPhones have that stupid notch and the header starts at the VERY top of the screen...
    <View style={Platform.OS === 'ios' ? styles.iosheader : styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

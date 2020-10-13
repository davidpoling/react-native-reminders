import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Platform} from 'react-native'

export default function Header({title}: any) {
  const styles = StyleSheet.create({
    header: {
      height: 60,
      padding: 15,
      backgroundColor: '#314b7f',
    },
    iosheader: {
      height: 90,
      padding: 15,
      paddingTop: 45,
      backgroundColor: '#314b7f',
    },
    text: {
      color: '#fff',
      fontSize: 23,
    },
  });

  return (
    // Because iPhones have that stupid notch and the header starts at the VERY top of the screen...
    <View style={Platform.OS === "ios" ? styles.iosheader : styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

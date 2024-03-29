import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {Platform} from 'react-native';

export default function Header({title}: any) {
  const styles = StyleSheet.create({
    header: {
      height: 60,
      padding: 15,
    },
    iosheader: {
      height: 115,
      padding: 15,
      paddingTop: 65,
    },
    text: {
      color: '#314b7f',
      fontSize: 25,
      fontWeight: 'bold',
    },
    textDarkMode: {
      color: '#3399ff',
      fontSize: 25,
      fontWeight: 'bold',
    },
  });

  const isDarkMode = useColorScheme() === 'dark';

  return (
    // Because iPhones have that stupid notch and the header starts at the VERY top of the screen...
    <View style={Platform.OS === 'ios' ? styles.iosheader : styles.header}>
      <Text style={isDarkMode ? styles.textDarkMode : styles.text}>{title}</Text>
    </View>
  );
}

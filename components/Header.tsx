import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Header({title}: any) {
  const styles = StyleSheet.create({
    header: {
      height: 60,
      padding: 15,
      backgroundColor: '#314b7f',
    },
    text: {
      color: '#fff',
      fontSize: 23,
    },
  });

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

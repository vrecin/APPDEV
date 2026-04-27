import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#2E073F',
  },
});

export default HomeScreen;

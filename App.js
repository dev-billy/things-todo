import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Things Todo</Text>
      <Text>Coming soon!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({item, handleDelete}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon style={styles.iconStyle} name="delete-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
  },
  title: {
    fontSize: 16,
  },
  iconStyle: {
    color: '#D90429',
  },
});

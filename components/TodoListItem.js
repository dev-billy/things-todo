import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default ({listItem}) => {
  const totalTasks = listItem.todos.length;
  const completedTasks = listItem.todos.filter(todo => todo.is_done).length;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{listItem.title}</Text>
        <Text style={styles.status}>
          Completed: {completedTasks}/{totalTasks}
        </Text>
        <Text style={styles.status}>
          last updated: {listItem.lastUpdatedOn}
        </Text>
      </View>
      <Icon name="chevron-right" size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    paddingHorizontal: 25,
    marginHorizontal: 15,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  status: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '300',
  },
});

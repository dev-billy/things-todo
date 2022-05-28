import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {Header, TodoListItem} from '../components';
const Home = () => {
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      title: 'Shopping List',
      totalTasks: 5,
      completedTasks: 3,
      lastUpdatedOn: '2020-05-01',
    },
    {
      id: 2,
      title: 'Today work List',
      totalTasks: 10,
      completedTasks: 0,
      lastUpdatedOn: '2020-05-01',
    },
    {
      id: 3,
      title: 'Workshop Notes',
      totalTasks: 15,
      completedTasks: 3,
      lastUpdatedOn: '2020-05-01',
    },
  ]);
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={todoLists}
        renderItem={listItem => <TodoListItem listItem={listItem.item} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F4',
  },
});
export default Home;

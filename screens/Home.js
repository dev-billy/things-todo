import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {Header, TodoListItem} from '../components';
import AddList from '../components/AddList';
const Home = () => {
  const [todoLists, setTodoLists] = useState([]);
  const addTodoList = todoList => {
    setTodoLists([...todoLists, todoList]);
  };
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={todoLists}
        renderItem={listItem => <TodoListItem listItem={listItem.item} />}
      />
      <View style={styles.addBtn}>
        <AddList addTodoList={addTodoList} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F4',
  },
  addBtn: {
    position: 'absolute',
    top: '95%',
    left: '90%',
    transform: [{translateX: -50}, {translateY: -50}],
  },
});
export default Home;

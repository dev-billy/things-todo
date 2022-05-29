import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Header} from '../components';
import AddItem from '../components/AddItem';
import TodoItem from '../components/TodoItem';

export const ListDetails = ({route}) => {
  const {listItem} = route.params;
  const [todoItems, setTodoItems] = useState(listItem.todos);
  const addTodoItem = todoItem => {
    setTodoItems(currentItems => [...currentItems, todoItem]);
  };
  return (
    <View style={styles.container}>
      <Header title={listItem.title} showIcon={false} />
      <View style={styles.content}>
        <AddItem addTodoItem={addTodoItem} />
        <FlatList
          data={todoItems}
          style={styles.itemList}
          renderItem={item => <TodoItem item={item.item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F4',
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 18,
  },
  itemList: {
    marginTop: 20,
  },
});

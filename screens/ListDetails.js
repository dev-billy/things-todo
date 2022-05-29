import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, FlatList} from 'react-native';
import {Header} from '../components';
import AddItem from '../components/AddItem';
import TodoItem from '../components/TodoItem';
import {addTodoItemToList} from '../redux/actions';

export const ListDetails = ({route}) => {
  const {listId} = route.params;
  const listItem = useSelector(state =>
    state.todoListsReducer.todoLists.find(item => item.id === listId),
  );
  const dispatch = useDispatch();

  const addTodoItem = todoItem => {
    dispatch(addTodoItemToList(listId, todoItem));
  };
  return (
    <View style={styles.container}>
      <Header title={listItem.title} showIcon={false} />
      <View style={styles.content}>
        <AddItem addTodoItem={addTodoItem} />
        <FlatList
          data={listItem.todos}
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

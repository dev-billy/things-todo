import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, FlatList, Alert, Text} from 'react-native';
import {Header} from '../components';
import AddItem from '../components/AddItem';
import TodoItem from '../components/TodoItem';
import {
  addTodoItemToList,
  updateTodoItem,
  deleteTodoItem,
  deleteList,
} from '../redux/actions';

export const ListDetails = ({route, navigation}) => {
  const {listId} = route.params;
  const listItem = useSelector(state =>
    state.todoListsReducer.todoLists.find(item => item.id === listId),
  );
  const completedTasks = listItem.todos.filter(item => item.completed).length;
  const totalTasks = listItem.todos.length;
  const dispatch = useDispatch();

  const addTodoItem = todoItem => {
    dispatch(addTodoItemToList(listId, todoItem));
  };

  const handleComplete = todoItem => {
    dispatch(updateTodoItem(listId, todoItem.id, todoItem));
  };

  const handleDelete = todoItemId => {
    dispatch(deleteTodoItem(listId, todoItemId));
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDeleteList = id => {
    dispatch(deleteList(id));
  };

  const endMenu = () => {
    Alert.alert(
      'Delete List',
      '\nAre you sure you want to delete this list? \n\n This action cannot be undone',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            handleGoBack();
            handleDeleteList(listId);
          },
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      <Header
        title={listItem.title}
        showIcon={false}
        goBack={handleGoBack}
        endMenu={endMenu}
      />
      <View style={styles.content}>
        <AddItem addTodoItem={addTodoItem} />
        <Text style={styles.status}>
          Completed: {completedTasks}/{totalTasks}
        </Text>
        <FlatList
          data={listItem.todos}
          style={styles.itemList}
          renderItem={item => (
            <TodoItem
              item={item.item}
              showCheck
              handleComplete={handleComplete}
              handleDelete={handleDelete}
            />
          )}
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
  status: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
});

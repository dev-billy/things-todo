import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements';

import {Text, View, StyleSheet, FlatList} from 'react-native';
import TodoItem from './TodoItem';
import AddItem from './AddItem';

export default ({close, addTodoList}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoTitleErr, setTodoTitleErr] = useState('');
  const [todoItems, setTodoItems] = useState([]);

  const onTodoTitleTextChange = text => {
    setTodoTitle(text);
    setTodoTitleErr('');
  };

  const saveTodoList = () => {
    if (todoTitle.trim() === '') {
      setTodoTitleErr('Todo list title is required');
    } else {
      const now = new Date();
      let todoListId = Math.floor(now.valueOf() + Math.random()) % 1000;
      let todoList = {
        id: todoListId,
        name: todoTitle,
      };
      addTodoList(todoListId, todoList, todoItems);
      close();
    }
  };

  const addTodoItem = todoItem => {
    setTodoItems(currentItems => [...currentItems, todoItem]);
  };

  const removeItem = id => {
    setTodoItems(currentItems => {
      return currentItems.filter(item => item.id !== id);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.listTitle}>
        <Text style={styles.title}>Add Todo List</Text>
        <Input
          placeholder="List Name"
          label="List Name"
          labelStyle={styles.inputLabel}
          style={styles.input}
          value={todoTitle}
          onChangeText={onTodoTitleTextChange}
          errorMessage={todoTitleErr}
        />
      </View>
      <View>
        <Text style={styles.todoItemsText}>Todo Items</Text>
        <AddItem addTodoItem={addTodoItem} />
      </View>
      <FlatList
        data={todoItems}
        style={styles.todoItems}
        renderItem={item => (
          <TodoItem item={item.item} handleDelete={removeItem} />
        )}
      />
      <View style={styles.buttonGroup}>
        <Button
          type="clear"
          title="Cancel"
          titleStyle={styles.buttonCancel}
          onPress={() => close()}
        />
        <Button
          buttonStyle={styles.buttonSave}
          title="Save"
          onPress={saveTodoList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputLabel: {
    color: '#333',
    fontWeight: '300',
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 5,
  },
  todoItemsText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginLeft: 10,
    paddingVertical: 20,
  },
  todoItems: {
    marginTop: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  buttonCancel: {
    color: '#000',
    paddingHorizontal: 40,
  },
  buttonSave: {
    paddingHorizontal: 50,
    backgroundColor: '#EE6C4D',
  },
});

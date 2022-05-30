import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import uuid from 'react-native-uuid';
export default ({addTodoItem}) => {
  const [todoItemErr, setTodoItemErr] = useState('');
  const [todoText, setTodoText] = useState('');

  const onTextChange = text => {
    setTodoText(text);
    setTodoItemErr('');
  };

  const addTodo = () => {
    if (todoText.trim() === '') {
      setTodoItemErr('Todo text is required');
      return;
    }
    addTodoItem({id: uuid.v4(), description: todoText, is_done: false});
    //clears the current text
    setTodoText('');
  };

  return (
    <View style={styles.todoItemsInputGrp}>
      <Input
        placeholder="Add Item..."
        label="Add Item"
        labelStyle={styles.inputLabel}
        style={styles.input}
        value={todoText}
        errorMessage={todoItemErr}
        onChangeText={onTextChange}
        onSubmitEditing={addTodo}
      />
      <Button
        buttonStyle={styles.buttonAddTodo}
        onPress={addTodo}
        title="Add item"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonAddTodo: {
    flexShrink: 0.3,
    alignSelf: 'flex-end',
    backgroundColor: '#EE6C4D',
  },
  inputLabel: {
    color: '#333',
    fontWeight: '300',
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 5,
  },
});

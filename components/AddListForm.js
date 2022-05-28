import React from 'react';
import {Button, Input} from 'react-native-elements';

import {Text, View, StyleSheet, FlatList} from 'react-native';

export default ({close}) => {
  return (
    <View style={styles.container}>
      <View style={styles.listTitle}>
        <Text style={styles.title}>Add Todo List</Text>
        <Input
          placeholder="List Name"
          label="List Name"
          labelStyle={styles.inputLabel}
          style={styles.input}
        />
      </View>
      <View style={styles.todoItems}>
        <Text style={styles.todoItemsText}>Todo Items</Text>
        <View style={styles.todoItemsInputGrp}>
          <Input
            placeholder="Add Item..."
            label="Add Item"
            labelStyle={styles.inputLabel}
            style={styles.input}
          />
          <Button buttonStyle={styles.buttonAddTodo} title="Add item" />
        </View>
      </View>
      <FlatList />
      <View style={styles.buttonGroup}>
        <Button
          type="clear"
          title="Cancel"
          titleStyle={styles.buttonCancel}
          onPress={() => close()}
        />
        <Button buttonStyle={styles.buttonSave} title="Save" />
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
  buttonAddTodo: {
    flexShrink: 0.3,
    alignSelf: 'flex-end',
    backgroundColor: '#EE6C4D',
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

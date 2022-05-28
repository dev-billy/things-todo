import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Header} from '../components';
import TodoItem from '../components/TodoItem';

export const ListDetails = ({route}) => {
  const {listItem} = route.params;
  return (
    <View style={styles.container}>
      <Header title={listItem.title} showIcon={false} />
      <FlatList
        data={listItem.todos}
        renderItem={item => <TodoItem item={item.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

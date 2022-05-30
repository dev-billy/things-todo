import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {addTodoListAction, getTodoLists} from '../redux/actions';
import {Header, TodoListItem} from '../components';
import AddList from '../components/AddList';
const Home = ({navigation}) => {
  const {todoLists} = useSelector(state => state.todoListsReducer);
  const dispatch = useDispatch();
  const addTodoList = (id, todoList, items) => {
    dispatch(addTodoListAction(id, todoList, items));
  };

  useEffect(() => {
    dispatch(getTodoLists());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={todoLists}
        renderItem={listItem => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('List Details', {listId: listItem.item.id})
            }>
            <TodoListItem listItem={listItem.item} />
          </TouchableOpacity>
        )}
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

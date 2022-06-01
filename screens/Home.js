import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {
  addTodoListAction,
  runUpdateAndGetData,
  getTodoLists,
} from '../redux/actions';
import {Header, TodoListItem} from '../components';
import AddList from '../components/AddList';
import {useNetInfo} from '@react-native-community/netinfo';
const Home = ({navigation}) => {
  const {todoLists} = useSelector(state => state.todoListsReducer);
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    //use reduce to get offline todos
    const offlineTodos = todoLists.reduce((acc, list) => {
      let offlineTodo = [];
      let todoItemOffline = list.todos.filter(
        item => item.status === 'OFFLINE',
      );
      if (todoItemOffline.length > 0) {
        offlineTodo = [...offlineTodo, ...todoItemOffline];
      }
      return [...acc, ...offlineTodo];
    }, []);
    const offlineLists = todoLists.filter(list => list.status === 'OFFLINE');
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      setIsConnected(true);
      if (offlineLists.length > 0 || offlineTodos.length > 0) {
        dispatch(runUpdateAndGetData(offlineLists, offlineTodos));
      } else if (todoLists.length === 0) {
        //This would be called if the application starts on first build offline then changes status to online
        dispatch(getTodoLists());
      }
    } else {
      setIsConnected(false);
    }
  }, [netInfo, dispatch, todoLists]);
  const addTodoList = (id, todoList, items) => {
    dispatch(addTodoListAction(id, todoList, items));
  };

  return (
    <View style={styles.container}>
      <Header />
      {isConnected ? <Text>CONNECTED</Text> : <Text>OFFLINE</Text>}
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

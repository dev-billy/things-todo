import {buildTodoList, postTodoItems, postTodoList} from '../utils/api_methods';

//action types
export const GET_TODO_LISTS = 'GET_TODO_LISTS';
export const ADD_TODO_LIST = 'ADD_TODO_LIST';
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST';
export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM';
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';
export const TOGGLE_TODO_ITEM = 'TOGGLE_TODO_ITEM';

export const getTodoLists = () => {
  return async dispatch => {
    const todoLists = await buildTodoList();
    dispatch({
      type: GET_TODO_LISTS,
      payload: todoLists,
    });
  };
};

export const addTodoListAction = (id, todoList, items) => {
  return async dispatch => {
    postTodoList(todoList)
      .then(res => {
        if (res.status === 200) {
          postTodoItems(id, items);
          return res.data;
        }
      })
      .then(data => {
        dispatch({
          type: ADD_TODO_LIST,
          payload: {
            id: todoList.id,
            title: todoList.name,
            todos: items,
            lastUpdatedOn: data.updated_at,
          },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: ADD_TODO_LIST,
          payload: {
            id: todoList.id,
            title: todoList.name,
            todos: items,
            lastUpdatedOn: 'OFFLINE',
          },
        });
      });
  };
};

export const addTodoItemToList = (listId, todoItem) => {
  return {
    type: ADD_TODO_ITEM,
    payload: {
      listId,
      todoItem,
    },
  };
};

export const updateTodoItem = (listId, todoItemId, todoItem) => {
  return {
    type: UPDATE_TODO_ITEM,
    payload: {
      listId,
      todoItemId,
      todoItem,
    },
  };
};

export const deleteTodoItemAction = (listId, todoItemId) => {
  return {
    type: DELETE_TODO_ITEM,
    payload: {
      listId,
      todoItemId,
    },
  };
};

export const deleteList = listId => {
  return {
    type: DELETE_TODO_LIST,
    payload: listId,
  };
};

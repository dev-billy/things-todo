import {
  buildTodoList,
  postTodoItems,
  postTodoList,
  postTodoItem,
  patchTodoItem,
  deleteTodoItem,
  deleteTodoList,
} from '../utils/api_methods';

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
        if (res.status === 200 && items.length > 0) {
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
        if (err.message === 'Network Error') {
          dispatch({
            type: ADD_TODO_LIST,
            payload: {
              id: todoList.id,
              title: todoList.name,
              todos: [...markItemsAsOffline(items, todoList.id)],
              status: 'OFFLINE',
            },
          });
        }
      });
  };
};

const markItemsAsOffline = (items, list_id) =>
  items.map(item => ({...item, status: 'OFFLINE', list_id: list_id}));

export const addTodoItemToList = (listId, todoItem) => {
  return async dispatch => {
    postTodoItem(listId, todoItem)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: ADD_TODO_ITEM,
            payload: {
              listId,
              todoItem: res.data,
            },
          });
        }
      })
      .catch(err => {
        console.log(err);
        if (err.message === 'Network Error') {
          dispatch({
            type: ADD_TODO_ITEM,
            payload: {
              listId,
              todoItem: {
                ...todoItem,
                status: 'OFFLINE',
                list_id: listId,
              },
            },
          });
        }
      });
  };
};

export const updateTodoItem = (listId, todoItemId, todoItem) => {
  return async dispatch => {
    patchTodoItem(todoItem.id, todoItem)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: UPDATE_TODO_ITEM,
            payload: {
              listId,
              todoItemId,
              todoItem: res.data,
            },
          });
        }
      })
      .catch(err => {
        console.log(err);
        if (err.message === 'Network Error') {
          dispatch({
            type: UPDATE_TODO_ITEM,
            payload: {
              listId,
              todoItemId,
              todoItem: {
                ...todoItem,
                status: 'OFFLINE',
                actionType: UPDATE_TODO_ITEM,
              },
            },
          });
        }
      });
  };
};

export const deleteTodoItemAction = (listId, todoItemId) => {
  return async dispatch => {
    deleteTodoItem(todoItemId)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_TODO_ITEM,
            payload: {
              listId,
              todoItemId,
            },
          });
        }
      })
      .catch(err => {
        console.log(err);
        if (err.message === 'Network Error') {
          dispatch({
            type: DELETE_TODO_ITEM,
            payload: {
              listId,
              todoItemId,
              status: 'OFFLINE',
              actionType: DELETE_TODO_ITEM,
            },
          });
        }
      });
  };
};

export const deleteList = listId => {
  return async dispatch => {
    deleteTodoList(listId)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_TODO_LIST,
            payload: listId,
          });
        }
      })
      .catch(err => {
        console.log(err);
        if (err.message === 'Network Error') {
          dispatch({
            type: DELETE_TODO_LIST,
            payload: listId,
            status: 'OFFLINE',
            actionType: DELETE_TODO_LIST,
          });
        }
      });
  };
};

export const runUpdatesOnOfflineData = (offlineTodoLists, todoItems) => {
  return async dispatch => {
    if (offlineTodoLists.length > 0) {
      for (let i = 0; i < offlineTodoLists.length; i++) {
        let todoListToBeSaved = {
          id: offlineTodoLists[i].id,
          name: offlineTodoLists[i].title,
        };
        await dispatch(
          addTodoListAction(offlineTodoLists[i].id, todoListToBeSaved, []),
        );
      }
    }
    if (todoItems.length > 0) {
      for (let i = 0; i < todoItems.length; i++) {
        let todoItemToBeSaved = {
          id: todoItems[i].id,
          description: todoItems[i].description,
          is_done: todoItems[i].is_done,
        };
        let listId = todoItems[i].list_id;
        await dispatch(addTodoItemToList(listId, todoItemToBeSaved));
      }
    }
  };
};

export const runUpdateAndGetData = (todoLists, todoItems) => {
  return async dispatch => {
    if (todoLists.length > 0 || todoItems.length > 0) {
      await dispatch(runUpdatesOnOfflineData(todoLists, todoItems));
      await dispatch(getTodoLists());
    }
    await dispatch(getTodoLists());
  };
};

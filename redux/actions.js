import Axios from 'axios';
import {TODO_ITEMS_URL, TODO_LISTS_URL} from '../config';

//action types
export const GET_TODO_LISTS = 'GET_TODO_LISTS';
export const ADD_TODO_LIST = 'ADD_TODO_LIST';
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST';
export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM';
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';
export const TOGGLE_TODO_ITEM = 'TOGGLE_TODO_ITEM';

const fetchTodoListFromApi = async () => {
  let response;
  try {
    response = await Axios.get(TODO_LISTS_URL);
  } catch (err) {
    console.log(err);
  }
  if (response) {
    return response.data;
  } else {
    console.log('Could not fetch todo lists from API');
  }
};

const fetchTodoListWithTodos = async todoListId => {
  let response;
  try {
    response = await Axios.get(`${TODO_LISTS_URL}/${todoListId}`);
  } catch (err) {
    console.log(err);
  }
  if (response) {
    return response.data;
  } else {
    console.log('Could not fetch todo list with todos from API');
  }
};

/**
 * {
 *  id: 1,
 * title: 'My Todo List',
 * todos: [
 * {
 * id: 1,
 * text: 'My Todo Item',
 * completed: false,
 * },
 * }
 */

const buildTodoList = async () => {
  let todoLists = [];
  const todoListFromApi = await fetchTodoListFromApi();
  if (todoListFromApi) {
    let length = todoListFromApi.length;
    for (let i = 0; i < length; i++) {
      const todoList = await fetchTodoListWithTodos(todoListFromApi[i].id);
      todoLists = [
        ...todoLists,
        {
          id: todoList.id,
          title: todoList.name,
          todos: todoList.todos,
          lastUpdatedOn: todoList.updated_at,
        },
      ];
    }
    return todoLists;
  }
};

const postTodoList = todoList => {
  const options = {
    method: 'POST',
    url: TODO_LISTS_URL,
    data: todoList,
  };
  return Axios.request(options);
};

const postTodoItems = (todoListId, todoItems) => {
  if (todoItems.length > 0) {
    todoItems.forEach(item => {
      const options = {
        method: 'POST',
        url: TODO_ITEMS_URL,
        data: {
          todo_list_id: todoListId,
          ...item,
        },
      };
      Axios.request(options);
    });
  }
};

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
  postTodoList(todoList).then(res => {
    if (res.status === 200) {
      postTodoItems(id, items);
    }
  });
  return {
    type: ADD_TODO_LIST,
    payload: todoList,
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

export const deleteTodoItem = (listId, todoItemId) => {
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

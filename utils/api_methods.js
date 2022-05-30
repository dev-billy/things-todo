import Axios from 'axios';
import {TODO_ITEMS_URL, TODO_LISTS_URL} from '../config';

export const fetchTodoListFromApi = async () => {
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

export const fetchTodoListWithTodos = async todoListId => {
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

export const buildTodoList = async () => {
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

export const postTodoList = todoList => {
  const options = {
    method: 'POST',
    url: TODO_LISTS_URL,
    data: todoList,
  };
  return Axios.request(options);
};

export const postTodoItem = (todoListId, todoItem) => {
  const options = {
    method: 'POST',
    url: TODO_ITEMS_URL,
    data: {
      todo_list_id: todoListId,
      ...todoItem,
    },
  };
  return Axios.request(options);
};

export const postTodoItems = (todoListId, todoItems) => {
  if (todoItems.length > 0) {
    todoItems.forEach(item => {
      postTodoItem(todoListId, item);
    });
  }
};

//action types
export const GET_TODO_LISTS = 'GET_TODO_LISTS';
export const ADD_TODO_LIST = 'ADD_TODO_LIST';
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST';
export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';
export const TOGGLE_TODO_ITEM = 'TOGGLE_TODO_ITEM';

export const getTodoLists = () => {
  return async dispatch => {
    //update to get todo lists from api
    dispatch({
      type: GET_TODO_LISTS,
    });
  };
};

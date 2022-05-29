import {ADD_TODO_LIST, GET_TODO_LISTS} from './actions';

const initialState = {
  todoLists: [],
};

const todoListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LISTS:
      return {
        ...state,
      };
    case ADD_TODO_LIST:
      return {
        ...state,
        todoLists: [...state.todoLists, action.payload],
      };
    default:
      return state;
  }
};

export {todoListsReducer};

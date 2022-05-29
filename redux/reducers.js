import {ADD_TODO_LIST, ADD_TODO_ITEM, GET_TODO_LISTS} from './actions';

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
    case ADD_TODO_ITEM:
      return {
        ...state,
        todoLists: state.todoLists.map(list => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              todos: [...list.todos, action.payload.todoItem],
            };
          }
          return list;
        }),
      };
    default:
      return state;
  }
};

export {todoListsReducer};

import {
  ADD_TODO_LIST,
  ADD_TODO_ITEM,
  GET_TODO_LISTS,
  UPDATE_TODO_ITEM,
} from './actions';

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
    case UPDATE_TODO_ITEM:
      return {
        ...state,
        todoLists: state.todoLists.map(list => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              todos: list.todos.map(item => {
                if (item.id === action.payload.todoItemId) {
                  return {
                    ...item,
                    ...action.payload.todoItem,
                  };
                }
                return item;
              }),
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

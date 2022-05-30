import {
  ADD_TODO_LIST,
  ADD_TODO_ITEM,
  GET_TODO_LISTS,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  DELETE_TODO_LIST,
} from './actions';

const initialState = {
  todoLists: [],
};

const todoListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LISTS:
      if (action.payload) {
        return {
          ...state,
          todoLists: action.payload,
        };
      } else {
        return {...state};
      }
    case ADD_TODO_LIST:
      //paused this implementation revisit when working with online-offline data
      return {
        ...state,
        todoLists: [...state.todoLists],
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
    case DELETE_TODO_ITEM:
      return {
        ...state,
        todoLists: state.todoLists.map(list => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              todos: list.todos.filter(
                item => item.id !== action.payload.todoItemId,
              ),
            };
          }
          return list;
        }),
      };
    case DELETE_TODO_LIST:
      return {
        ...state,
        todoLists: state.todoLists.filter(list => list.id !== action.payload),
      };
    default:
      return state;
  }
};

export {todoListsReducer};

import {GET_TODO_LISTS} from './actions';

const initialState = {
  todoLists: [],
};

const todoListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LISTS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export {todoListsReducer};

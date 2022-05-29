import {createStore, combineReducers} from 'redux';

import {todoListsReducer} from './reducers';

const rootReducer = combineReducers({todoListsReducer});

export const store = createStore(rootReducer);

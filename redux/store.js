import {createStore, combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {todoListsReducer} from './reducers';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  todoListsReducer: persistReducer(persistConfig, todoListsReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);

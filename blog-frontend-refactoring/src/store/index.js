  
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import editorReducer from './Editor/editor';

export const reducers = combineReducers({
    editor: editorReducer,

});

const store = configureStore({ reducer: reducers });

export default store;
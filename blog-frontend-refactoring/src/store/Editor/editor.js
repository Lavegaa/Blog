import { createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';

const editorReducer = createSlice({
  name: 'editor',
  initialState: {
    title: '',
    markdown: '',
    tags: '',
    postId: null
  },
  reducers: {
    initialize(state, action) {
        return state
    },

    changeInput(state, { payload: { name, value } }) {
        return {
          ...state,
          [name]: value
        };
    },
  },
});

export const { initialize, changeInput } = editorReducer.actions;

export default editorReducer.reducer;
import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [
    { id: 1, text: 'Sample Todo', completed: false }
  ],
  reducers: {
    addTodo: (state, action) => { 
      state.push({ id: state.length + 1, text: action.payload, completed: false });
    },
    
    deleteTodo: (state, action) => { 
      return state.filter(todo => todo.id !== action.payload);
    }
  }
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;

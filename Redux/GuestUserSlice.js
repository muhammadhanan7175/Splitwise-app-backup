import { createSlice } from '@reduxjs/toolkit';

const GuestUserSlice = createSlice({
    name: 'todos',
    initialState: {
        value: []
    }, // Initial state is an empty array
    reducers: {
        addTodo: (state, action) => {
            // state.push(...action.payload); // Append the new todo to the array
            state.value = [...state.value, action.payload] // Append the new todo to the array
        },
        emptyTodos: (state) => {
            // state.push(...action.payload); // Append the new todo to the array
            state.value = [] // Append the new todo to the array
        }
    },
});

export const { addTodo} = GuestUserSlice.actions;
export const getTodos = (state) => state.todos.value

export default GuestUserSlice.reducer;

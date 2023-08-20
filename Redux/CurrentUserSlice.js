import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    value : "",
}
export const CurrentUserSlice = createSlice(
    {
        name : "currentUser",
        initialState,
        reducers : {
            setCurrentUser : (state,action)  =>{
                console.log(action.payload)
                state.value = action.payload
            }
        }

    }
)
export const {setCurrentUser} = CurrentUserSlice.actions
export default CurrentUserSlice.reducer
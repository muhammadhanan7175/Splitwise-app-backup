import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from "../Redux/CurrentUserSlice"
import guestUserReducer from "../Redux/GuestUserSlice"
export  const store = configureStore({
  reducer: {
    currentUser : currentUserReducer,
    todos:  guestUserReducer
  },
})
export default store
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      if (action.payload.rememberMe) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state;

export default userSlice.reducer;

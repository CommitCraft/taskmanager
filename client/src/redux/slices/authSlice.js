import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: (() => {
    try {
      const userData = Cookies.get("token");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing userInfo from cookies:", error);
      return null;
    }
  })(),
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      Cookies.set("token", JSON.stringify(action.payload), { expires: 7, secure: true, sameSite: "Strict" }); 
      // `expires: 7` means the cookie will last for 7 days
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("token");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;
export default authSlice.reducer;

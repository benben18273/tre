import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = {
  user: {};
  isLoggedIn: boolean;
  notification: [];
  logo: string;
  icoChat: [];
};

const initialState: any = {
  user: {},
  isLoggedIn: false,
  isLoading: true,
  notification: [],
  icoChat: [],
  logo: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setAuthenticationState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNotification: (state, action: PayloadAction<any>) => {
      state.notification = action.payload;
    },
    setLogo: (state, action: PayloadAction<any>) => {
      state.logo = action.payload;
    },
    seticoChat: (state, action: any) => {
      state.icoChat = action.payload;
    },
    setChatico: (state, action: any) => {
      state.icoChat = [...state.icoChat, action.payload];
    },
  },
});

export const {
  login,
  logout,
  setUser,
  setAuthenticationState,
  setLoading,
  setLogo,
  seticoChat,
  setChatico,
} = userSlice.actions;
export default userSlice.reducer;

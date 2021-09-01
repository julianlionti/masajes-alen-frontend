import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export type UserProps = { displayName: string; email: string };
export type UserState = {
  user: UserProps | null;
  loading: boolean;
  error: string;
};
const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
};

export const login = createAsyncThunk<UserProps, AuthProvider>(
  "user/login",
  async (provider) => {
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
    return user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    cleanUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action);
      state.error = "Ocurrió un error";
      state.loading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
  },
});

export const { cleanUser } = userSlice.actions;
const persistConfig: PersistConfig<UserState> = {
  key: "user",
  storage,
  blacklist: ["loading", "error"],
};

export const userReducer = persistReducer(persistConfig, userSlice.reducer);
export default userReducer;

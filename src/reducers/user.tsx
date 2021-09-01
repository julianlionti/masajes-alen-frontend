import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import axios, { AxiosError } from "axios";
import Urls from "../utils/Urls";
import Config from "../utils/Config";
import Cookies from "js-cookie";

export type UserProps = {
  displayName: string;
  email: string;
  uid: string;
  token: string;
};

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
    let user: UserProps | null = null;
    if (Config.NODE_ENV !== "development") {
      const { user: fbUser } = await signInWithPopup(auth, provider);
      const token = await fbUser.getIdToken();
      const { displayName, email, uid } = fbUser;
      user = { displayName, email, uid, token };
    } else {
      user = {
        displayName: "Prueba",
        email: "prueba@prueba.com",
        uid: "zktlgAweWxgHZuFG9P7uF1iYllf1",
        token: "ey273128937218907219837219hjkashdaksjdh192037120389yh0",
      };
    }

    try {
      await axios.post(Urls.user, user);
      return user;
    } catch (ex) {
      const error = ex as AxiosError;
      const { response } = error.request || {};
      throw Error(response);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    cleanUser: () => {
      auth.signOut();
      Cookies.remove(Config.USER_KEY);
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      const error = JSON.parse(action.error.message || "{}");
      state.error = `(${error.code}) ${error.message}`;
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

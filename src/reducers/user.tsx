import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import Urls from "../utils/Urls";
import Config from "../utils/Config";
import Cookies from "../utils/Cookies";
import { makeRequest } from "../utils/makeRequest";

export type UserProps = {
  displayName: string;
  email: string;
  uid: string;
  token: string;
  admin: boolean;
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
    await auth.signOut();

    let user: UserProps | null = null;
    if (Config.NODE_ENV !== "development") {
      const { user: fbUser } = await signInWithPopup(auth, provider);
      const token = await fbUser.getIdToken();
      const { displayName, email, uid } = fbUser;
      user = { displayName, email, uid, token, admin: false };
    } else {
      const isFb = provider instanceof FacebookAuthProvider;
      user = {
        admin: isFb,
        displayName: "Prueba2",
        email: `prueba@${isFb ? "fb" : "google"}.com`,
        uid: isFb
          ? "zktlgAweWxgHZuFG9P7uF1iYllf1"
          : "zktlgAweWxgHZh3s1P7uF1iYllf1",
        token: isFb
          ? "eysadmansdjklashodjkahsdjlka"
          : "eyaskdplp2k3lñ2wkñl2k32ñl3k2ñl3k",
      };
    }

    Cookies.set(Config.USER_KEY, user.token, {
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    const { data } = await makeRequest({
      url: Urls.user,
      data: user,
      method: "POST",
    });
    return { ...user, admin: data.admin };
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
      state.user = null;
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

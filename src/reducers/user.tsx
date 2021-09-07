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
import { isRejectedAction, parseRejected } from "../utils/redux";
import { ContactState } from "../components/ContactoInfo/ContactoInfo";

export type UserProps = {
  displayName: string;
  email?: string;
  cel?: string;
  uid: string;
  token: string;
  admin: boolean;
  id: string;
};

export type UserState = {
  user: UserProps | null;
  loading: boolean;
  error: string;
  success: string;
};
const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
  success: "",
};

const sliceName = "user";

export const login = createAsyncThunk<UserProps, AuthProvider>(
  `${sliceName}/login`,
  async (provider) => {
    await auth.signOut();

    let user: Partial<UserProps> | null = null;
    if (Config.NODE_ENV !== "development") {
      const { user: fbUser } = await signInWithPopup(auth, provider);
      const token = await fbUser.getIdToken();
      const { displayName, email, uid } = fbUser;
      user = { displayName, email, uid, token, admin: false };
    } else {
      const isFb = provider instanceof FacebookAuthProvider;
      user = {
        admin: isFb,
        displayName: "Prueba3",
        // email: `prueba@${isFb ? "fb" : "google"}.com`,
        uid: isFb
          ? "zktlgAweW22325323P7uF1iYllf1"
          : "zktlgAweWxgHZh3s1P7uF1iYllf1",
        token: isFb
          ? "eysad2322mansdjklashodjkahsdjlka"
          : "eyaskdplp2k3lñ2wkñl2k32ñl3k2ñl3k",
      };
    }

    const { data } = await makeRequest({
      url: Urls.user,
      data: user,
      method: "POST",
    });

    Cookies.set(Config.USER_KEY, user.token, {
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { ...user, ...data, id: data._id } as UserProps;
  }
);

type UpdateContactProps = { id: string; values: ContactState };
export const updateContact = createAsyncThunk<UserProps, UpdateContactProps>(
  `${sliceName}/update`,
  async ({ id, values }, { dispatch }) => {
    dispatch(clearMsg());
    const { data } = await makeRequest({
      url: `${Urls.user}/${id}`,
      data: values,
      method: "PUT",
    });
    return { ...data, id: data._id } as UserProps;
  }
);

const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    clearMsg: (state) => ({ ...state, error: "", success: "" }),
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

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

    builder.addCase(updateContact.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.success = "Actualizado";
    });

    builder.addMatcher(isRejectedAction(sliceName), parseRejected);
  },
});

export const { cleanUser, clearMsg } = userSlice.actions;
const persistConfig: PersistConfig<UserState> = {
  key: "user",
  storage,
  blacklist: ["loading", "error"],
};

export const userReducer = persistReducer(persistConfig, userSlice.reducer);
export default userReducer;

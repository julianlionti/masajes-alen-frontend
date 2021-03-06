import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "../reducers/user";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import turnReducer, { TurnState } from "../reducers/turn";

interface State {
  user: UserState;
  turn: TurnState;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    turn: turnReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;

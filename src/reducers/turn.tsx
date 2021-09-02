import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { makeRequest } from "../utils/makeRequest";
import Urls from "../utils/Urls";

export type TurnStates = "pendiente" | "cancelado" | "finalizado";
export type TurnProps = {
  day: string;
  createdAt: string;
  duration: number;
  updatedAt: string;
  _id: string;
  state: TurnStates;
};

export type TurnState = {
  turns: TurnProps[] | null;
  myTurns: TurnProps[] | null;
  loading: boolean;
  error: string;
  success: string;
};
const initialState: TurnState = {
  turns: null,
  myTurns: null,
  loading: false,
  error: "",
  success: "",
};

export const getTurns = createAsyncThunk<TurnProps[]>("turn", async () => {
  const { data } = await makeRequest({ url: Urls.turn });
  return data;
});

export const getMyTurns = createAsyncThunk<TurnProps[]>("turn/me", async () => {
  const { data } = await makeRequest({ url: Urls.myturns });
  return data;
});

type TurnPost = { day: string };
export const postTurn = createAsyncThunk<TurnProps, TurnPost>(
  "turn/new",
  async ({ day }) => {
    const { data } = await makeRequest({
      url: Urls.turn,
      method: "POST",
      data: { day },
    });

    return data;
  }
);

type TurnPut = { id: string; state: TurnStates };
export const editTurn = createAsyncThunk<TurnProps, TurnPut>(
  "turn/edit",
  async ({ id, state }) => {
    const { data } = await makeRequest({
      url: `${Urls.turn}/${id}`,
      method: "PUT",
      data: { state },
    });

    return data;
  }
);

const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    cleanTurns: () => {
      return initialState;
    },
    cleanPostedTurn: (state) => {
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postTurn.fulfilled, (state, action) => {
      state.turns.push(action.payload);
      state.loading = false;
      state.success = "El turno fue reservado satisfactoriamente";
    });

    builder.addCase(getTurns.fulfilled, (state, action) => {
      state.turns = action.payload;
      state.loading = false;
    });

    builder.addCase(getMyTurns.fulfilled, (state, action) => {
      state.myTurns = action.payload;
      state.loading = false;
    });

    builder.addCase(editTurn.fulfilled, (state, action) => {
      const edited = action.payload;
      state.myTurns = state.myTurns.map((e) => {
        if (e._id === edited._id) return edited;
        return e;
      });
      state.loading = false;
    });

    builder.addMatcher(isPending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addMatcher(isRejected, (state, action) => {
      const { error } = action;
      const { message } = error || {};
      const final = JSON.parse(message || "{}");
      state.error = `(${final.code}) ${final.message}`;
      state.loading = false;
    });
  },
});

export const { cleanTurns, cleanPostedTurn } = turnSlice.actions;
export const turnReducer = turnSlice.reducer;
export default turnReducer;

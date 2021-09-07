/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

type RejetedState = { error: string; loading: boolean };

export const parseRejected = (
  state: WritableDraft<RejetedState>,
  action: PayloadAction<
    unknown,
    string,
    {
      arg: any;
      requestId: string;
      requestStatus: "rejected";
      aborted: boolean;
      condition: boolean;
    } & (
      | { rejectedWithValue: true }
      | ({ rejectedWithValue: false } & Record<string, any>)
    ),
    SerializedError
  >
): void | WritableDraft<RejetedState> => {
  const { message } = action.error;
  const isObj = typeof message === "object";
  const error = isObj ? JSON.parse(message || "{}") : message;
  console.log(isObj, message);

  state.error = isObj ? `(${error.code}) ${error.message}` : message;
  state.loading = false;
};

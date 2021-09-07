/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, CaseReducer } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

type RejetedState = { error: string; loading: boolean };

export const parseRejected: CaseReducer<any, AnyAction> = (
  state,
  action
): void | WritableDraft<RejetedState> => {
  const actionMessage = action.error.message;

  try {
    const mcError = JSON.parse(actionMessage || "{}");
    const { error, errors, message, code } = mcError;
    if (message && code) {
      state.error = `(${code}) ${message}`;
    }
    if (error) {
      state.error = `(${error.code}) ${error.message}`;
    }
    if (errors) {
      state.error = errors
        .map((e: any) => `(${e.code}) ${e.message}`)
        .join("\n");
    }
  } catch {
    state.error = actionMessage;
  }

  state.loading = false;
};

export const isRejectedAction =
  (prefixName: string) =>
  (action: AnyAction): boolean =>
    action.type.startsWith(prefixName) && action.type.endsWith("rejected");

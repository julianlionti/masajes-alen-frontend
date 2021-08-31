import axios from "axios";
import { useEffect, useReducer } from "react";
import { Turns } from "../components/Turns";
import Urls from "../utils/Urls";

export type TurnState = Partial<{
  error: string;
  loading: boolean;
  data: { days: { start: string }[] };
}>;
type TurnActions =
  | { type: "FETCH" }
  | { type: "FINISH"; data: any }
  | { type: "ERROR"; error: string };

const turnsReducer = (state: TurnState, action: TurnActions): TurnState => {
  switch (action.type) {
    case "FETCH":
      return { data: undefined, error: undefined, loading: true };
    case "FINISH":
      return { data: action.data, error: undefined, loading: false };
    case "ERROR":
      return { data: undefined, error: action.error, loading: false };

    default:
      return state;
  }
};

const TurnsScreen = (): JSX.Element => {
  const [state, dispatch] = useReducer(turnsReducer, {});

  useEffect(() => {
    const getTurns = async () => {
      dispatch({ type: "FETCH" });
      try {
        const { data } = await axios(Urls.turn);
        dispatch({ type: "FINISH", data });
      } catch (ex) {
        dispatch({ type: "ERROR", error: ex.message });
      }
    };
    getTurns();
  }, [dispatch]);

  return <Turns {...state} />;
};

export default TurnsScreen;

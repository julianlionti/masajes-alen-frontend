import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Turns } from "../components/Turns";
import { getTurns } from "../reducers/turn";

const TurnsScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTurns());
  }, [dispatch]);

  return <Turns />;
};

export default TurnsScreen;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyTurns } from "../../reducers/turn";
import { useSelector } from "../../utils/Store";
import { Loading } from "../Loading";
import { TurnRow } from "./TurnRow";

export const MyTurns = (): JSX.Element => {
  const dispatch = useDispatch();
  const { myTurns, loading } = useSelector(({ turn }) => turn);

  useEffect(() => {
    dispatch(getMyTurns());
  }, [dispatch]);

  return (
    <div>
      <Loading show={loading} />
      <span>Mis turnos</span>
      {myTurns?.map((e) => (
        <TurnRow key={e._id} {...e} />
      ))}
    </div>
  );
};

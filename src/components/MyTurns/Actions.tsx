import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { editTurn, TurnProps, TurnStates } from "../../reducers/turn";
import { useSelector } from "../../utils/Store";
import { IconButton } from "../IconButton/IconButton";

const HorizontalDiv = styled.div`
  display: flex;
`;

type Props = TurnProps;
export const Actions = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => user);
  if (!user) throw Error("No se paso usuario");
  const { state, _id } = props;
  const { admin } = user;

  const edit = useCallback(
    (state: TurnStates) => () => {
      dispatch(editTurn({ id: _id, state }));
    },
    [dispatch, _id]
  );

  if (state !== "pendiente") {
    return null;
  }

  return (
    <HorizontalDiv>
      <IconButton data-tip="Cancelar turno" onClick={edit("cancelado")}>
        <FontAwesomeIcon size={"2x"} color="red" icon={faTimesCircle} />
      </IconButton>
      {admin && (
        <IconButton data-tip="Finalizar turno" onClick={edit("finalizado")}>
          <FontAwesomeIcon size={"2x"} color="green" icon={faCheckCircle} />
        </IconButton>
      )}
    </HorizontalDiv>
  );
};

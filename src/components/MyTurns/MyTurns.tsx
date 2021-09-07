import styled from "styled-components";
import { useSelector } from "../../utils/Store";
import { Loading } from "../Loading";
import { TurnRow } from "./TurnRow";

const CenteredDiv = styled.span`
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MyTurns = (): JSX.Element => {
  const { user } = useSelector(({ user }) => user);
  const { myTurns, loading } = useSelector(({ turn }) => turn);

  const renderText = () => {
    if (user.admin)
      return (
        <span>
          No se encontraron turnos pedidos con los filtros establecidos
        </span>
      );

    return (
      <span>
        Todavía no pediste ningun turno! Que estás esperando? Hacé click
        <a href="/turns">
          <b>{` Aca`}</b>
        </a>
      </span>
    );
  };

  return (
    <div>
      <Loading show={loading} />
      {myTurns?.length === 0 && <CenteredDiv>{renderText()}</CenteredDiv>}
      {myTurns?.map((e) => (
        <TurnRow key={e._id} {...e} />
      ))}
    </div>
  );
};

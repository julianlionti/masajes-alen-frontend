import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/es";
import { useMemo } from "react";
import styled from "styled-components";
import { TurnProps, TurnStates } from "../../reducers/turn";
import ReactTooltip from "react-tooltip";

import {
  faCalendarAlt,
  faClock,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { useSelector } from "../../utils/Store";
import { Actions } from "./Actions";

type StyleProps = Partial<{ state: TurnStates }>;
const Card = styled.div<StyleProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 10px 10px;
  border-bottom: 3px solid;
  border-bottom-color: ${({ state }) =>
    `${
      state === "cancelado" ? "red" : state === "pendiente" ? "orange" : "green"
    }!important`};
`;

const Body = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 30px;
`;

const Small = styled.small`
  font-size: 0.725em;
`;

const ActionRoot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TurnRow = memo((props: TurnProps): JSX.Element => {
  const { user } = useSelector(({ user }) => user);
  if (!user) throw Error("No se paso usuario");
  const { admin } = user;

  const { state, day, createdAt, userInfo } = props;
  const { displayName, email } = userInfo;

  const today = moment();
  const turnDay = moment(day);
  const diff = turnDay.diff(today, "d");
  const diffHours = diff < 2 ? turnDay.diff(today, "h") : undefined;

  const remainingDaysText = useMemo(() => {
    if (diff === 0) {
      if (diffHours < 0) return "Tu turno fue hoy ";
      if (diffHours < 24) return `Faltan ${diffHours} horas para tu turno`;
      return "Tu turno es hoy ";
    }
    if (diff === 1) {
      if (diffHours > 24) return "Faltan 2 dias para tu turno ";
      return `Faltan ${diffHours + 1} horas para tu turno `;
    }
    if (diff > 1) return `Faltan ${diff + 1} días para tu turno `;
    if (diff < 0) return "Tu turno fue ayer ";
  }, [diff, diffHours]);

  return (
    <Card state={state}>
      <Body>
        <span>
          <FontAwesomeIcon color={"#b2b2b2"} icon={faClock} />
          <i>{` Fecha y Hora del Turno: `}</i>
          <b>{turnDay.format("LLL")}</b>
        </span>
        {admin && (
          <span>
            <FontAwesomeIcon color={"#b2b2b2"} icon={faUserCircle} />
            Turno pedido por:{" "}
            <b>
              {displayName} ({email})
            </b>
          </span>
        )}
        <span>
          <FontAwesomeIcon color={"#b2b2b2"} icon={faCalendarAlt} />
          {` ${remainingDaysText}`}
        </span>
        <ActionRoot>
          <div>
            <Small>
              El turno fue pedido el <b>{moment(createdAt).format("LL")}</b> y
              se encuentra en estado <b>{state}</b>
            </Small>
          </div>
          <Actions {...props} />
        </ActionRoot>
      </Body>
      <ReactTooltip />
    </Card>
  );
});

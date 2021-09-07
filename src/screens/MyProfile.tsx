import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/ButtonElement";
import { MyTurns } from "../components/MyTurns/MyTurns";
import { ScreenContainer } from "../components/ScreenContainer/ScreenContainer";
import { cleanUser } from "../reducers/user";
import Config from "../utils/Config";
import Cookies from "../utils/Cookies";
import { useSelector } from "../utils/Store";
import Switch from "react-switch";
import { useState } from "react";
import { getMyTurns } from "../reducers/turn";

const Title = styled.h2`
  padding: 10px 0px;
  flex: 1;
`;

const FilterText = styled.p`
  margin-right: 1rem;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Separator = styled.hr`
  margin: 10px 0px;
`;

const CenteredDiv = styled.div`
  align-self: center;
  width: 200px;
`;

const FilterRoot = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;
  align-self: flex-end;
`;

export type FilterState = { finished: boolean; cancelled: boolean };
type CreateFilter = ({
  title,
  key,
}: {
  title: string;
  key: keyof FilterState;
}) => JSX.Element;

const MyProfileScreen = (): JSX.Element => {
  const [filter, setFilters] = useState<FilterState>({
    finished: true,
    cancelled: true,
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const handleCerrar = useCallback(() => {
    dispatch(cleanUser());
  }, [dispatch]);

  const { user } = useSelector(({ user }) => user);
  useEffect(() => {
    const userInfo = Cookies.get(Config.USER_KEY);
    if (user && !userInfo) dispatch(cleanUser());
    if (!user && !userInfo) history.replace("/signin");
  }, [dispatch, user, history]);

  useEffect(() => {
    dispatch(getMyTurns(filter));
  }, [dispatch, filter]);

  const createFilter = useCallback<CreateFilter>(
    ({ title, key }) => {
      const handleCheck = () => {
        setFilters((e) => ({ ...e, [key]: !e[key] }));
      };

      return (
        <FilterRoot>
          <FilterText onClick={handleCheck}>{title}</FilterText>
          <Switch checked={filter[key]} onChange={handleCheck} />
        </FilterRoot>
      );
    },
    [filter]
  );

  if (!user) return null;
  const { admin } = user;

  return (
    <ScreenContainer
      title={`Mi cuenta${admin ? " - Vista Administrativa" : ""}`}
    >
      <Header>
        <Title>Historial de turnos</Title>
        {createFilter({ title: "Esconder finalizados", key: "finished" })}
        {createFilter({ title: "Esconder cancelados", key: "cancelled" })}
      </Header>
      <Separator />
      <MyTurns />
      <Title>Opciones de mi Cuenta</Title>
      <Separator />
      <CenteredDiv>
        <Button onClick={handleCerrar}>Cerrar sesion</Button>
      </CenteredDiv>
    </ScreenContainer>
  );
};

export default MyProfileScreen;

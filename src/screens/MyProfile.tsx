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
import { auth } from "../utils/firebaseConfig";
import { useSelector } from "../utils/Store";

const Title = styled.h2`
  padding: 10px 0px;
`;

const Separator = styled.hr`
  margin: 10px 0px;
`;

const CenteredDiv = styled.div`
  align-self: center;
  width: 200px;
`;

const MyProfileScreen = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCerrar = useCallback(() => {
    dispatch(cleanUser());
    history.replace("/");
  }, [dispatch, history]);

  const { user } = useSelector(({ user }) => user);
  useEffect(() => {
    const userInfo = Cookies.get(Config.USER_KEY);
    if (user && !userInfo) {
      auth.signOut().then(() => history.replace("/"));
    }
  }, [user, history]);

  if (!user) return null;
  const { admin } = user;

  return (
    <ScreenContainer
      title={`Mi cuenta${admin ? " - Vista Administrativa" : ""}`}
    >
      <Title>Historial de turnos</Title>
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

import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ScreenContainer } from "../components/ScreenContainer/ScreenContainer";
import { cleanUser } from "../reducers/user";
import { useSelector } from "../utils/Store";

const MyProfileScreen = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCerrar = useCallback(() => {
    dispatch(cleanUser());
  }, [dispatch]);

  const { user } = useSelector(({ user }) => user);
  useEffect(() => {
    if (!user) {
      history.replace("/");
    }
  }, [user, history]);

  return (
    <ScreenContainer title="Mi cuenta">
      <div>Prueba</div>
      <button onClick={handleCerrar}>Cerrar sesion</button>
    </ScreenContainer>
  );
};

export default MyProfileScreen;

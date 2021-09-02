import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "../../reducers/user";
import Config from "../../utils/Config";
import Cookies from "../../utils/Cookies";
import {
  auth,
  fbAuthProvider,
  googleAuthProvider,
} from "../../utils/firebaseConfig";
import { useSelector } from "../../utils/Store";
import { Loading } from "../Loading";

import {
  Icon,
  Container,
  FormWrap,
  FormContent,
  Form,
  FormH1,
  SocialButton,
  FacebookIcon,
  SocialText,
  GoogleIcon,
  ErrorRoot,
  ErrorP,
} from "./SiginElements";

type SiginState = { from: string };
export const Singin = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation<SiginState>();
  const { loading, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    const userInfo = Cookies.get(Config.USER_KEY);
    if (user && userInfo) {
      console.log(state);
      history.replace(state?.from || "/");
    }
    if (user && !userInfo) {
      auth.signOut();
    }
  }, [user, history, state]);

  return (
    <Container>
      <FormWrap>
        <Icon to="/">Julieta Alen Masajes</Icon>
        <FormContent>
          <Form>
            <FormH1>Iniciar sesión con las redes</FormH1>
            <SocialButton
              bgcolor="#3b5998"
              onClick={() => dispatch(login(fbAuthProvider))}
            >
              <FacebookIcon />
              <SocialText>Iniciar sesion con Facebook</SocialText>
            </SocialButton>
            <SocialButton
              bgcolor="#DB4437"
              onClick={() => dispatch(login(googleAuthProvider))}
            >
              <GoogleIcon />
              <SocialText>Iniciar sesion con Google</SocialText>
            </SocialButton>
            {error && (
              <ErrorRoot>
                <ErrorP>{error}</ErrorP>
              </ErrorRoot>
            )}
          </Form>
        </FormContent>
      </FormWrap>
      <Loading show={loading} />
    </Container>
  );
};

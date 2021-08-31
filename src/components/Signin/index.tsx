import { useDispatch } from "react-redux";
import { login } from "../../reducers/user";
import { fbAuthProvider, googleAuthProvider } from "../../utils/firebaseConfig";
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
} from "./SiginElements";

export const Singin = (): JSX.Element => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
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
          </Form>
        </FormContent>
      </FormWrap>
      <Loading show={loading} />
    </Container>
  );
};

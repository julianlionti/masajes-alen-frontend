import firebase from "firebase";
import { useCallback } from "react";
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
  const callLogin = useCallback((provider: firebase.auth.AuthProvider) => {
    const auth = firebase.auth();
    auth.languageCode = "es";
    auth.signInWithPopup(provider);
  }, []);

  return (
    <Container>
      <FormWrap>
        <Icon to="/">Julieta Alen Masajes</Icon>
        <FormContent>
          <Form>
            <FormH1>Iniciar sesión con las redes</FormH1>
            <SocialButton
              bgcolor="#3b5998"
              onClick={() =>
                callLogin(new firebase.auth.FacebookAuthProvider())
              }
            >
              <FacebookIcon />
              <SocialText>Iniciar sesion con Facebook</SocialText>
            </SocialButton>
            <SocialButton
              bgcolor="#DB4437"
              onClick={() => callLogin(new firebase.auth.GoogleAuthProvider())}
            >
              <GoogleIcon />
              <SocialText>Iniciar sesion con Google</SocialText>
            </SocialButton>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

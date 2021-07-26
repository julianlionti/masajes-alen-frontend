import {
  Icon,
  Container,
  FormWrap,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from "./SiginElements";

export const Singin = () => {
  return (
    <Container>
      <FormWrap>
        <Icon to="/">Julieta Alen Masajes</Icon>
        <FormContent>
          <Form>
            <FormH1>Iniciar sesión</FormH1>
            <FormLabel htmlFor="telefono">Teléfono</FormLabel>
            <FormInput id="telefono" type="text" required></FormInput>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <FormInput id="password" type="password"></FormInput>
            <FormButton>Continuar</FormButton>
            <Text>Me olvidé la contraseña</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

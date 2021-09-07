import { Form, useFormikContext } from "formik";
import MaskedInput from "react-text-mask";
import styled from "styled-components";
import { Button } from "../ButtonElement";
import { ContactState } from "./ContactoInfo";
import emailMask from "text-mask-addons/dist/emailMask";
import { useSelector } from "../../utils/Store";

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled(MaskedInput)`
  padding: 8px 16px;
  margin: 8px 0px;
  border: none; /* <-- This thing here */
  border: solid 1px #ccc;
  border-radius: 10px;
`;

const Small = styled.small`
  margin: 16px 0px;
`;

const Root = styled.div`
  max-width: 300px;
`;

const ErrorP = styled.p`
  color: #721c24;
  margin-top: 2px;
  margin-bottom: 8px;
  text-align: start;
`;

const ErrorRoot = styled.div`
  display: flex;
  margin-bottom: 14px;
`;

const ErrorServer = styled.p`
  padding: 18px;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  flex: 1;
`;

export const ContactForm = (): JSX.Element => {
  const { loading, error } = useSelector(({ user }) => user);
  const {
    submitForm,
    errors,
    setFieldValue,
    setFieldTouched,
    touched,
    values,
  } = useFormikContext<ContactState>();

  return (
    <Form>
      <Root>
        <p>Se debe ingresar algún dato de contacto</p>
        <FlexDiv>
          <TextInput
            disabled={loading}
            onBlur={() => setFieldTouched("email")}
            onChange={(e) => setFieldValue("email", e.target.value)}
            value={values.email}
            mask={emailMask}
            name="email"
            placeholder="E-mail"
          />
          {errors.email && touched.email && <ErrorP>{errors.email}</ErrorP>}
          <TextInput
            onBlur={() => setFieldTouched("cel")}
            disabled={loading}
            value={values.cel}
            onChange={(e) => setFieldValue("cel", e.target.value)}
            mask={[
              "(",
              "1",
              "1",
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            name="cel"
            placeholder="Whatsapp (1234-4567)"
          />
          {errors.cel && touched.cel && <ErrorP>{errors.cel}</ErrorP>}
          <Small>
            *Es necesario ingresar el email o el whataspp para poder avisarte
            24hs al turno
          </Small>
          {error && (
            <ErrorRoot>
              <ErrorServer>{error}</ErrorServer>
            </ErrorRoot>
          )}
          <Button disabled={loading} primary onClick={submitForm}>
            Enviar
          </Button>
        </FlexDiv>
      </Root>
    </Form>
  );
};

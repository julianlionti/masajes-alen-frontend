import { Formik } from "formik";
import { useSelector } from "../../utils/Store";
import * as Yup from "yup";
import { ContactForm } from "./ContactForm";
import { useDispatch } from "react-redux";
import { updateContact } from "../../reducers/user";

export type ContactState = { email: string; cel: string };
export const ContactoInfo = (): JSX.Element => {
  const { user } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const initialValues: ContactState = {
    email: user?.email || "",
    cel: user?.cel || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateContact({ id: user.id, values }));
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("El mail ingresado es incorrecto")
          .required("El mail es obligatorio"),
        // cel: Yup.string().required(),
      })}
    >
      <ContactForm />
    </Formik>
  );
};

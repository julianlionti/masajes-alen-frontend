import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearMsg } from "../../reducers/user";
import { useSelector } from "../../utils/Store";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { ContactoInfo } from "./ContactoInfo";

type Props = { onClose: (wasAceppted: boolean) => void; show: boolean };
export const ContactAlert = (props: Props): JSX.Element => {
  const { onClose, show } = props;
  const { success } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      onClose(true);
      dispatch(clearMsg());
    }
  }, [dispatch, success, onClose]);

  return (
    <AlertDialog
      show={show}
      icon="information"
      btns={["close"]}
      onClose={onClose}
      title={`Atención`}
      subtitle={<ContactoInfo />}
    />
  );
};

import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "../../utils/Store";
import { Button } from "../ButtonElement";
import { ContactAlert } from "../ContactoInfo/ContactAlert";

const HorizontalDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0px;
`;

export const PersonalInfo = (): JSX.Element => {
  const [edit, setEdit] = useState(false);
  const { user } = useSelector(({ user }) => user);
  const { email, cel } = user || {};
  return (
    <HorizontalDiv>
      <div>
        <b>E-Mail: </b>
        <span>{email || "-"}</span>
      </div>
      <div>
        <b>Celular: </b>
        <span>{cel || "-"}</span>
      </div>
      <Button primary onClick={() => setEdit(true)}>
        Editar Datos
      </Button>
      <ContactAlert show={edit} onClose={() => setEdit(false)} />
    </HorizontalDiv>
  );
};

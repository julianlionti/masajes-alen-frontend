import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "../../utils/Store";
import { Button } from "../ButtonElement";
import { ContactAlert } from "../ContactoInfo/ContactAlert";

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0px;

  @media screen and (max-width: 768px) {
    flex-direction: column !important;
  }
`;

const ItemRoot = styled.div`
  margin-bottom: 8px;
`;

export const PersonalInfo = (): JSX.Element => {
  const [edit, setEdit] = useState(false);
  const { user } = useSelector(({ user }) => user);
  const { email, cel } = user || {};
  return (
    <HorizontalDiv>
      <ItemRoot>
        <b>E-Mail: </b>
        <span>{email || "-"}</span>
      </ItemRoot>
      <ItemRoot>
        <b>Celular: </b>
        <span>{cel || "-"}</span>
      </ItemRoot>
      <Button primary onClick={() => setEdit(true)}>
        Editar Datos
      </Button>
      <ContactAlert show={edit} onClose={() => setEdit(false)} />
    </HorizontalDiv>
  );
};

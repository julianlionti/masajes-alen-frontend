import styled from "styled-components";
import { TurnProps } from "../../reducers/turn";

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 10px 0px;
`;

const Body = styled.div`
  flex: 1 1 auto;
  padding: 1rem 1rem;
`;

export const TurnRow = (props: TurnProps): JSX.Element => {
  const { state, day, duration } = props;
  return (
    <Card>
      <Body>Turno</Body>
    </Card>
  );
};

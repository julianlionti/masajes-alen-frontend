import { Background, Centered, Root } from "./LoadingElements";
import { ClockLoader } from "react-spinners";

type Props = { show: boolean };
export const Loading = ({ show }: Props): JSX.Element => {
  return (
    <>
      <Background open={show} />
      <Root open={show}>
        <Centered open={show}>
          <ClockLoader />
        </Centered>
      </Root>
    </>
  );
};

import styled from "styled-components";
import { primaryColor, primaryColorDark } from "../ButtonElement";
import { Loading } from "../Loading";
import { Icon } from "../Signin/SiginElements";
import CustomScroll from "react-scrollbars-custom";

type Props = React.PropsWithChildren<{ title: string; loading?: boolean }>;

const Root = styled.div`
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  background: linear-gradient(
    108deg,
    ${primaryColor} 0%,
    ${primaryColorDark} 100%
  );
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  background: #fff;
  min-width: 300px;
  max-width: 1100px;
  width: 90%;
  z-index: 1;
  align-self: center;
  padding: 32px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0, 9);
  margin-top: 16px;
`;

const Scroll = styled(CustomScroll)`
  height: 450px !important;

  @media screen and (max-width: 480px) {
    height: 400px !important;
  }
`;

const FlexDIv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ScreenContainer = (props: Props): JSX.Element => {
  const { title, children, loading } = props;
  return (
    <Root>
      <Loading show={loading} />
      <Wrapper>
        <Icon to="/">{title}</Icon>
        <Content>
          <Scroll>
            <FlexDIv>{children}</FlexDIv>
          </Scroll>
        </Content>
      </Wrapper>
    </Root>
  );
};

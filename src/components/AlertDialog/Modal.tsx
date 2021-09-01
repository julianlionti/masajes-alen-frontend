import styled from "styled-components";

type StyleProps = Partial<{ open: boolean }>;

const Background = styled.section<StyleProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #e2e2e2;
  z-index: 10;
  filter: blur(2);
  opacity: ${({ open }) => (open ? 0.6 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: all 0.3s linear;
  animation-delay: ${({ open }) => `${open ? 0.5 : 0}s`};
`;

const Root = styled.div<StyleProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: all 0.3s linear;
  animation-delay: ${({ open }) => `${open ? 5 : 0}s`};
`;

const Centered = styled.div<StyleProps>`
  transform: ${({ open }) => `translateY(${open ? 0 : 1500}px)`};
  transition: all 0.5s linear;
  animation-delay: 0.5s;
  display: flex;
  pointer-events: initial;
  z-index: 12;
`;

type Props = React.PropsWithChildren<{
  open?: boolean;
  onClose?: () => void;
  closeClickOutside?: boolean;
}>;

export const Modal = (props: Props): JSX.Element => {
  const { open, onClose, children, closeClickOutside } = props;

  return (
    <>
      <Background
        open={open}
        onClick={() => {
          if (closeClickOutside && onClose) onClose();
        }}
      />
      <Root
        open={open}
        onClick={() => {
          if (onClose) onClose();
        }}
      >
        <Centered open={open}>{children}</Centered>
      </Root>
    </>
  );
};

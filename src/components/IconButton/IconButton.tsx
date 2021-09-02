import styled from "styled-components";

type Props = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

type StyleProps = Partial<{ disabled?: boolean }>;
const Button = styled.button<StyleProps>`
  border: none;
  background: none;
  color: black;
  padding: 8;
  margin-left: 8;
  cursor: pointer;
  border-radius: 50%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;

  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) =>
    disabled ? "not-allowed !important" : "pointer"};

  &:hover {
    background-color: #e7e7e7;
    color: white;
  }
`;

export const IconButton = (props: Props): JSX.Element => {
  const { children, ...btnProps } = props;

  return <Button {...btnProps}>{children}</Button>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link as LinkR, LinkProps as LinkPropsR } from "react-router-dom";
import { Link as LinkS, LinkProps as LinkPropsS } from "react-scroll";
import styled from "styled-components";

type ButtonProps = Partial<
  Record<"primary" | "dark" | "big" | "fontBig", boolean>
>;

export const primaryColor = "#EA80E3"; // "#01bf71"
export const primaryColorDark = "#df3ed5";

const StyledBtn = styled.div<ButtonProps>`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? primaryColor : "#010606")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#FFF")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  user-select: none;

  &:hover {
    @media screen and (min-width: 480px) {
      transition: all 0.2s ease-in-out;
      background: ${({ primary }) => (primary ? primaryColor : "#eeeeee")};
      color: #010606;
    }
  }
`;

export const Button = StyledBtn;

export const ButtonR = (
  props: React.PropsWithChildren<ButtonProps & { btnProps: LinkPropsR }>
): JSX.Element => {
  const { children, btnProps, ...rest } = props;
  return (
    <LinkR {...(btnProps as any)} style={{ textDecoration: "none" }}>
      <StyledBtn {...rest}>{children}</StyledBtn>
    </LinkR>
  );
};

export const ButtonS = (
  props: React.PropsWithChildren<ButtonProps & { btnProps: LinkPropsS }>
): JSX.Element => {
  const { children, btnProps, ...rest } = props;
  return (
    <LinkS {...(btnProps as any)} style={{ textDecoration: "none" }}>
      <StyledBtn {...rest}>{children}</StyledBtn>
    </LinkS>
  );
};

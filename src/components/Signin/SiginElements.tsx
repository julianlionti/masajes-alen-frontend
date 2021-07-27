import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { primaryColor, primaryColorDark } from "../ButtonElement";

export const Container = styled.div`
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(
    108deg,
    ${primaryColorDark} 0%,
    ${primaryColor} 100%
  );
`;

export const FormWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 480px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;
  user-select: none;
  @media screen and (min-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 480px) {
    padding: 10px;
  }
`;

export const Form = styled.div`
  background: #010101;
  max-width: 400px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 80px 32px;
  border-radius: 4px;
  row-gap: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0, 9);

  @media screen and (min-width: 480px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 16px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;

export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 4px;
`;

export const FormButton = styled.button`
  background: ${primaryColorDark};
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

export const Text = styled.span`
  text-align: center;
  margin-top: 24px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
`;

type SocialBuuttonProps = { bgcolor: string };
export const SocialButton = styled.button<SocialBuuttonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ bgcolor }) => bgcolor};
  border: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

export const FacebookIcon = styled(FaFacebook)`
  height: 64px;
  color: #fff;
`;

export const GoogleIcon = styled(FaGoogle)`
  height: 64px;
  color: #fff;
`;

export const SocialText = styled.p`
  text-align: center;
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
`;

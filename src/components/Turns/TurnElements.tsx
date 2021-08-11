import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { primaryColor, primaryColorDark } from "../ButtonElement";
import CustomScroll from "react-scrollbars-custom";

export const TurnsRoot = styled.div`
  min-height: 692px;
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

export const TurnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TurnContent = styled.div`
  background: #fff;
  min-width: 300px;
  max-width: 1100px;
  width: 90%;
  z-index: 1;
  margin: 0 auto;
  padding: 32px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0, 9);
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 480px) {
    padding: 32px 32px;
    width: 100%;
  }
`;

export const TurnHeader = styled.div`
  display: flex;
  align-items: center;
`;

type IconProps = { disabled?: boolean };
export const ArrowLeft = styled(MdKeyboardArrowLeft)<IconProps>`
  margin-left: 8px;
  font-size: ${({ disabled }) => (disabled ? "30px" : "36px")};
  border-radius: ${({ disabled }) => (disabled ? "15px" : "18px")};
  cursor: pointer;
  color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.6)"};

  border: 1.5px solid;
  border-color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.6)"};
  padding: 2px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "initial")};
  transition: all 0.2 ease-in-out;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)<IconProps>`
  margin-left: 8px;
  font-size: ${({ disabled }) => (disabled ? "30px" : "36px")};
  border-radius: ${({ disabled }) => (disabled ? "15px" : "18px")};
  cursor: pointer;
  color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.6)"};
  border: 1.5px solid;
  border-color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.6)"};
  padding: 2px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "initial")};
  margin-right: 16px;
  transition: all 0.2 ease-in-out;
`;

export const DateText = styled.p`
  user-select: none;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
`;

export const DaysContent = styled.div`
  /* height: 380px; */
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const DayCard = styled.div`
  width: 100%;
  /* margin: 8px; */
  /* height: 460px; */

  @media screen and (max-width: 480px) {
    &:nth-child(n + 2) {
      display: none;
    }
  }

  @media screen and (max-width: 760px) {
    &:nth-child(n + 4) {
      display: none;
    }
  }

  @media screen and (max-width: 840px) {
    &:nth-child(n + 6) {
      display: none;
    }
  }
`;

export const DayHeader = styled.div`
  display: flex;
`;

export const DayH2 = styled.h2`
  user-select: none;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 8px;
`;

type TurnItemProps = { disabled?: boolean };
export const TurnItem = styled.button<TurnItemProps>`
  width: 98%;
  border: none;
  background: ${({ disabled }) =>
    disabled ? "rgba(0,0,0,0.3)" : primaryColor};
  margin-top: 8px;
  color: #fff;
  user-select: none;
  text-align: center;
  padding: 10px 0;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  font-size: 16px;
  filter: ${({ disabled }) => (disabled ? "blur(2px)" : "blur(0px)")};
  -ms-filter: ${({ disabled }) => (disabled ? "blur(2px)" : "blur(0px)")};
  -webkit-filter: ${({ disabled }) => (disabled ? "blur(2px)" : "blur(0px)")};
  &:hover {
    background: ${({ disabled }) =>
      disabled ? "rgba(0,0,0,0.3)" : primaryColorDark};
  }
`;

export const DayScroll = styled(CustomScroll)`
  height: 375px !important;

  @media screen and (max-width: 480px) {
    height: 400px !important;
  }
`;

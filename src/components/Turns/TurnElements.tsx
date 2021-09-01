import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { primaryColor, primaryColorDark } from "../ButtonElement";
import CustomScroll from "react-scrollbars-custom";

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
  filter: ${({ disabled }) => (disabled ? "blur(0.5px)" : "blur(0px)")};

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

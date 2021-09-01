import Question from "../../assets/icons/question.svg";
import Warning from "../../assets/icons/warning.svg";
import ErrorImg from "../../assets/icons/error.svg";
import Information from "../../assets/icons/information.svg";
import Success from "../../assets/icons/success.svg";
import Share from "../../assets/icons/share.svg";

import { useCallback } from "react";
import styled from "styled-components";
import { Modal } from "./Modal";
import { IconButton } from "../IconButton/IconButton";
import { FaTimes } from "react-icons/fa";
import { Button } from "../ButtonElement";

type IconVariants =
  | "question"
  | "warning"
  | "error"
  | "information"
  | "success"
  | "share";

interface Props {
  title: string;
  btns?: ("accept" | "cancel" | "close")[];
  show: boolean;
  onClose: (wasAccepted: boolean) => void;
  icon?: IconVariants;
  iconSize?: number;
  subtitle?: string | JSX.Element;
}

const ModalRoot = styled.div`
  min-width: 350px;
  background-color: white;
  border: solid 1px #ddd;
  border-radius: 10px;
  box-shadow: none;
  color: #333;
  display: block;
  text-decoration: none !important;
  margin-bottom: 30px;
`;

const IconContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenteredTitle = styled.h2`
  text-align: center;
`;

const CenteredP = styled.p`
  text-align: center;
  margin-top: 8px;
`;

const StyledIcon = styled.div`
  padding: 8px 16px;
`;

const Body = styled.div`
  padding: 15px 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border-color: #f2f2f2;
  border-top: 1px solid #ddd;
  color: #333 !important;
  padding: 15px 20px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
`;

const BtnRoot = styled.div`
  margin: 0 16px;
`;

const CloseRoot = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const ImgIcon = styled.img`
  width: 96;
  height: 96;
`;

export const AlertDialog = (props: Props): JSX.Element => {
  const { btns, title, show, onClose, icon, subtitle } = props;
  const finalBtns = btns || ["accept", "cancel", "close"];

  const renderIcon = useCallback(() => {
    if (!icon) return null;

    const chooseIcon = () => {
      switch (icon) {
        case "question":
          return Question;
        case "error":
          return ErrorImg;
        case "information":
          return Information;
        case "share":
          return Share;
        case "success":
          return Success;
        case "warning":
          return Warning;
        default:
          return null;
      }
    };
    return (
      <IconContainer>
        <StyledIcon>
          <ImgIcon src={chooseIcon()} alt={icon} />
        </StyledIcon>
      </IconContainer>
    );
  }, [icon]);

  return (
    <Modal open={show}>
      <ModalRoot>
        {finalBtns?.includes("close") && (
          <CloseRoot>
            <IconButton onClick={() => onClose(false)}>
              <FaTimes style={{ fontSize: 18 }} />
            </IconButton>
          </CloseRoot>
        )}
        {renderIcon()}
        <Body>
          <CenteredTitle>{title}</CenteredTitle>
          {subtitle && <CenteredP>{subtitle}</CenteredP>}
        </Body>
        {(finalBtns?.includes("cancel") || finalBtns?.includes("accept")) && (
          <Footer>
            {finalBtns?.includes("cancel") && (
              <BtnRoot>
                <Button onClick={() => onClose(false)}>Cancelar</Button>
              </BtnRoot>
            )}
            {finalBtns?.includes("accept") && (
              <BtnRoot>
                <Button primary onClick={() => onClose(true)}>
                  Aceptar
                </Button>
              </BtnRoot>
            )}
          </Footer>
        )}
      </ModalRoot>
    </Modal>
  );
};

import { ButtonR } from "../ButtonElement";
import {
  BtnWrap,
  Column1,
  Column2,
  Heading,
  Img,
  ImgWrap,
  InfoContainer,
  InfoRow,
  InfoWrapper,
  Subtitle,
  TextWrapper,
  TopLine,
} from "./InfoSectionElements";

type InfoSectionProps = {
  id: string;
  topline: string;
  heading: string;
  subtitle: string;
  btn?: { title: string; route: string; dark?: boolean; primary?: boolean };
  img: string;
  imgStart?: boolean;
  dark?: boolean;
};

export const createSections = (props: InfoSectionProps[]): InfoSectionProps[] =>
  props;

export const InfoSection = (props: InfoSectionProps): JSX.Element => {
  const { id, heading, subtitle, topline, btn, img, imgStart, dark } = props;
  return (
    <InfoContainer id={id} lightBg={!dark}>
      <InfoWrapper>
        <InfoRow imgStart={imgStart}>
          <Column1>
            <TextWrapper>
              <TopLine>{topline}</TopLine>
              <Heading lightText={dark}>{heading}</Heading>
              <Subtitle darkText={!dark}>{subtitle}</Subtitle>
              {btn && (
                <BtnWrap>
                  <ButtonR btnProps={{ to: btn.route }} {...btn}>
                    {btn.title}
                  </ButtonR>
                </BtnWrap>
              )}
            </TextWrapper>
          </Column1>
          <Column2>
            <ImgWrap>
              <Img src={img} />
            </ImgWrap>
          </Column2>
        </InfoRow>
      </InfoWrapper>
    </InfoContainer>
  );
};

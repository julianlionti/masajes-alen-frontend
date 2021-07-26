import {
  ArrowForward,
  ArrowRight,
  MainBg,
  MainBtnWrapper,
  MainContent,
  MainH1,
  MainP,
  MainRoot,
  VideoBg,
} from "./MainSecionElements";
import Video from "../../assets/videos/video2.mp4";
import { useState } from "react";
import { ButtonS } from "../ButtonElement";

export const MainSection = () => {
  const [hover, setHover] = useState(false);

  return (
    <MainRoot>
      <MainBg>
        <VideoBg autoPlay loop muted src={Video} />
      </MainBg>
      <MainContent>
        <MainH1>Julieta Alen Masajes</MainH1>
        <MainP>Masajes relajantes, descontracturantes y deportivos</MainP>
        <MainP dense>Cosmetología / Limpieza facial</MainP>
        <MainP dense>Reflexología podal</MainP>
        <MainBtnWrapper
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
        >
          <ButtonS
            btnProps={{ to: "turns", smooth: true, duration: 500 }}
            primary
            dark
          >
            Pedir turno {hover ? <ArrowForward /> : <ArrowRight />}
          </ButtonS>
        </MainBtnWrapper>
      </MainContent>
    </MainRoot>
  );
};

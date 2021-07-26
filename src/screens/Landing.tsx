import { MainSection } from "../components/MainSection";
import { NavAndSide } from "../components/NavAndSide";

export const Landing = () => {
  return (
    <NavAndSide
      menus={[
        { route: "turns", title: "Turnos" },
        { route: "map", title: "Ubicación" },
        { route: "about", title: "Acerca de" },
      ]}
    >
      <MainSection />
    </NavAndSide>
  );
};

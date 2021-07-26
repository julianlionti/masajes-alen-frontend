import { Footer } from "../components/Footer";
import { createSections, InfoSection } from "../components/InfoSection";
import { MainSection } from "../components/MainSection";
import { NavAndSide } from "../components/NavAndSide";
import { createServices, ServicesSection } from "../components/ServicesSection";

const sections = createSections([
  {
    id: "turns",
    topline: "Turnos online",
    heading: "Reservá tu turno",
    subtitle:
      "Ahora podes reservar tu turno online, hace click el botón 'Reservar Turno' para poder seguir",
    btn: {
      title: "Reservar Turno",
      route: "/turns",
      dark: true,
      primary: true,
    },
    img: require("../assets/icons/calendar.svg"),
    imgStart: true,
    dark: false,
  },
  {
    id: "map",
    topline: "Ubicación",
    heading: "Ituzaingó",
    subtitle: "Provincia de Buenos Aires - Argentina",
    img: require("../assets/icons/map.svg"),
    imgStart: false,
    dark: true,
  },
]);

const services = createServices([
  {
    title: "Masajes",
    subtitle: "Relajantes, descontracturantes y deportivos",
    icon: require("../assets/icons/doctors.svg"),
  },
  {
    title: "Cosmetologia",
    subtitle: "Cosmetologia y Limpiza facial",
    icon: require("../assets/icons/reading.svg"),
  },
  {
    title: "Clientes",
    subtitle: "Pedí tu turno online y obtené beneficios",
    icon: require("../assets/icons/personal.svg"),
  },
]);

export const Landing = () => {
  return (
    <NavAndSide
      menus={[
        { route: "services", title: "Servicios" },
        { route: "turns", title: "Turnos" },
        { route: "map", title: "Ubicación" },
        { route: "sigunup", title: "Registrarse" },
      ]}
    >
      <MainSection />
      <ServicesSection services={services} />
      {sections.map((e) => (
        <InfoSection key={e.id} {...e} />
      ))}
      <Footer />
    </NavAndSide>
  );
};

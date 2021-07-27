import {
  ServicesCard,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesRoot,
  ServicesWrapper,
} from "./ServicesElements";

interface ServicesProps {
  icon: string;
  title: string;
  subtitle: string;
}

export const createServices = (props: ServicesProps[]): ServicesProps[] =>
  props;

type Props = { services: ServicesProps[] };
export const ServicesSection = (props: Props): JSX.Element => {
  const { services } = props;
  return (
    <ServicesRoot id="services">
      <ServicesH1>Servicios</ServicesH1>
      <ServicesWrapper>
        {services.map(({ icon, title, subtitle }) => (
          <ServicesCard key={icon}>
            <ServicesIcon src={icon} />
            <ServicesH2>{title}</ServicesH2>
            <ServicesP>{subtitle}</ServicesP>
          </ServicesCard>
        ))}
      </ServicesWrapper>
    </ServicesRoot>
  );
};

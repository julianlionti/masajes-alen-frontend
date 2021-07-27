import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  FooterLink,
  FooterLinkItems,
  FooterLinkItemsRoot,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterRoot,
  FooterWrap,
  SocialIconLink,
  SocialIcons,
  SocialLogo,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
} from "./FotterElements";

export const Footer = (): JSX.Element => {
  return (
    <FooterRoot>
      <FooterWrap>
        <FooterLinkItemsRoot>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Acerca de</FooterLinkTitle>
              <FooterLink to="/signin">How it works</FooterLink>
              <FooterLink to="/signin">Testimonials</FooterLink>
              <FooterLink to="/signin">Carrers</FooterLink>
              <FooterLink to="/signin">Terms of Services</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Redes sociales</FooterLinkTitle>
              <FooterLink to="/signin">Instagram</FooterLink>
              <FooterLink to="/signin">Facebook</FooterLink>
              <FooterLink to="/signin">Whatsapp</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinkItemsRoot>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/">Julieta Alen</SocialLogo>
            <WebsiteRights>
              Julieta Alen ® {new Date().getFullYear()} derenchos reservados
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink href="/" target="_blank" arial-label="Facebook">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" arial-label="Instagram">
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" arial-label="Whatsapp">
                <FaWhatsapp />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterRoot>
  );
};

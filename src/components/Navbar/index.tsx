import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavBtn,
  NavBtnLink,
  NavItems,
  NavLinks,
  NavLogo,
  NavMenu,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import { useNavAndSide } from "../../utils/NavAndSideProvider";

export const Navbar = () => {
  const { menus, toggleSidebar } = useNavAndSide();

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Julieta Alen</NavLogo>
        <MobileIcon onClick={toggleSidebar}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          {menus.map((e) => (
            <NavItems key={e.route}>
              <NavLinks to={e.route}>{e.title}</NavLinks>
            </NavItems>
          ))}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="signup">Registrarse</NavBtnLink>
        </NavBtn>
      </NavbarContainer>
    </Nav>
  );
};

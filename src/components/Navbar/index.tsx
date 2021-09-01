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
import { IconContext } from "react-icons/lib";
import { FaBars } from "react-icons/fa";
import { useNavAndSide } from "../../providers/NavAndSideProvider";
import { animateScroll } from "react-scroll";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "../../utils/Store";

export const Navbar = (): JSX.Element => {
  // const [user] = useUserCtx();
  const { user } = useSelector((state) => state.user);
  const { menus, toggleSidebar } = useNavAndSide();
  const [scrollNav, setScrollNav] = useState(false);

  useEffect(() => {
    const changeNav = () => {
      setScrollNav(window.scrollY >= 80);
    };

    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, []);

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo onClick={() => animateScroll.scrollToTop()} to="/">
            Julieta Alen
          </NavLogo>
          <MobileIcon onClick={toggleSidebar}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            {menus.map((e) => (
              <NavItems key={e.route}>
                <NavLinks smooth duration={500} spy to={e.route}>
                  {e.title}
                </NavLinks>
              </NavItems>
            ))}
          </NavMenu>
          <NavBtn>
            <NavBtnLink to={user ? "myprofile" : "signin"}>{`${
              !user ? `Iniciar Sesión` : "Mi cuenta"
            }`}</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

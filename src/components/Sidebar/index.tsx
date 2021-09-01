import { useNavAndSide } from "../../providers/NavAndSideProvider";
import { useSelector } from "../../utils/Store";
import {
  CloseIcon,
  Icon,
  SidebarLinks,
  SidebarMenu,
  SidebarRoot,
  SidebarRoute,
  SidebarWrapper,
  SideBtnWrap,
} from "./SideBarElements";

export const Sidebar = (): JSX.Element => {
  const { user } = useSelector(({ user }) => user);
  const { menus, toggleSidebar, sidebar } = useNavAndSide();
  return (
    <SidebarRoot isOpen={sidebar}>
      <Icon onClick={toggleSidebar}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {menus.map((e) => (
            <SidebarLinks
              key={e.route}
              smooth
              spy
              duration={500}
              to={e.route}
              onClick={toggleSidebar}
            >
              {e.title}
            </SidebarLinks>
          ))}
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute
            onClick={toggleSidebar}
            to={!user ? "signin" : "myprofile"}
          >
            {!user ? "Iniciar Sesión" : "Mi cuenta"}
          </SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarRoot>
  );
};

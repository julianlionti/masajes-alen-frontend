import { useNavAndSide } from "../../utils/NavAndSideProvider";
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

export const Sidebar = () => {
  const { menus, toggleSidebar, sidebar } = useNavAndSide();
  return (
    <SidebarRoot isOpen={sidebar}>
      <Icon onClick={toggleSidebar}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {menus.map((e) => (
            <SidebarLinks key={e.route} to={e.route} onClick={toggleSidebar}>
              {e.title}
            </SidebarLinks>
          ))}
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute onClick={toggleSidebar} to="signin">
            Iniciar Sesión
          </SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarRoot>
  );
};

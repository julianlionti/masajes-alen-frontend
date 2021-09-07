import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

type MenuProps = { route: string; title: string; redirect?: boolean };
interface NavAndSideCtx extends ProviderProps {
  toggleSidebar: () => void;
}

const initialState = {
  menus: [],
  sidebar: false,
  toggleSidebar: () => {},
};

export type ProviderProps = { menus: MenuProps[]; sidebar?: boolean };
const NavAndSideContext = createContext<NavAndSideCtx>(initialState);
export const useNavAndSide = (): NavAndSideCtx => useContext(NavAndSideContext);

type NavAndSideProviderProps = React.PropsWithChildren<ProviderProps>;
export const NavAndSideProvider = (
  props: NavAndSideProviderProps
): JSX.Element => {
  const { menus, children } = props;
  const [sidebar, toggleSidebar] = useState(props.sidebar || false);
  return (
    <NavAndSideContext.Provider
      value={{
        menus: menus,
        sidebar,
        toggleSidebar: () => {
          toggleSidebar((e) => !e);
        },
      }}
    >
      {children}
    </NavAndSideContext.Provider>
  );
};

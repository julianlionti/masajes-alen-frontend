import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { Dispatch, SetStateAction, useContext } from "react";

type MenuProps = { route: string; title: string };
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
export const useNavAndSide = () => useContext(NavAndSideContext);

type NavAndSideProviderProps = React.PropsWithChildren<ProviderProps>;
export const NavAndSideProvider = (props: NavAndSideProviderProps) => {
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

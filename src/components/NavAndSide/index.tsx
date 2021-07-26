import React from "react";
import {
  NavAndSideProvider,
  ProviderProps,
} from "../../utils/NavAndSideProvider";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";

type Props = React.PropsWithChildren<ProviderProps>;
export const NavAndSide = (props: Props) => {
  const { children, ...providerProps } = props;
  return (
    <NavAndSideProvider {...providerProps}>
      <Navbar />
      <Sidebar />
      {children}
    </NavAndSideProvider>
  );
};

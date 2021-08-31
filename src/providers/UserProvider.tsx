// import React, { createContext, useState, useContext, useEffect } from "react";

// export type UserProps = { displayName: string; email: string } | null;
// type UserCtx = [UserProps, React.Dispatch<React.SetStateAction<UserProps>>];

// const UserContext = createContext<UserCtx>([null, () => {}]);
// export const useUserCtx = (): UserCtx => useContext(UserContext);

// type ProviderProps = React.PropsWithChildren<{ dumi?: boolean }>;
// const lsKey = "JAM-User";
// export const UserProvider = (props: ProviderProps): JSX.Element => {
//   const { children } = props;
//   const [user, setUser] = useState<UserProps>(() => {
//     const userls = localStorage.getItem(lsKey);
//     if (!userls) return null;
//     return JSON.parse(userls) as UserProps;
//   });

//   useEffect(() => {
//     if (user) localStorage.setItem(lsKey, JSON.stringify(user));
//     else localStorage.removeItem(lsKey);
//   }, [user]);

//   return (
//     <UserContext.Provider value={[user, setUser]}>
//       {children}
//     </UserContext.Provider>
//   );
// };

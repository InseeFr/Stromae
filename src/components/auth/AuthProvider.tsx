import authContext from "./authContext";

type AuthProviderProps = {
  children: JSX.Element;
};

function AuthProvider({ children }: AuthProviderProps) {
  return <authContext.Provider value={{}}>{children}</authContext.Provider>;
}

export default AuthProvider;

import HeaderContainer from "./HeaderContainer";

interface HeaderProps {
  children: JSX.Element | JSX.Element[] | string;
}

function Header({ children }: HeaderProps) {
  return <HeaderContainer>{children}</HeaderContainer>;
}

export default Header;

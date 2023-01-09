interface HeaderContainerProps {
  children: JSX.Element | JSX.Element[] | string;
}

function HeaderContainer({ children }: HeaderContainerProps) {
  return (
    <div data-id="header" className="stroame-header">
      {children}
    </div>
  );
}

export default HeaderContainer;

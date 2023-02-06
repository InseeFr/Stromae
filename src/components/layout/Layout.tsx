import { useEffect, useState } from "react";
import HeaderType from "../../components/header/HeaderType";
import surveys from "../../lib/surveys/surveys";
import Header from "../../components/header/Header";
import HeaderAuth from "../../components/header/HeaderAuth";

type LayoutProps = {
  survey?: string;
  children: JSX.Element | JSX.Element[];
};

function Layout({ children, survey }: LayoutProps) {
  const [header, setHeader] = useState<HeaderType | undefined>(undefined);

  useEffect(
    function () {
      async function init() {
        if (survey) {
          const data = await surveys.getMetadataSurvey(survey);
          if (data) {
            const { Header } = data;
            setHeader(Header);
          }
        }
      }
      init();
    },
    [survey]
  );

  return (
    <div data-id="welcome" className="stromae-welcome">
      <HeaderAuth>
        <Header header={header} />
      </HeaderAuth>
      <main>{children}</main>
      <footer>TODO</footer>
    </div>
  );
}

export default Layout;

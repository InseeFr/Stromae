import Header from "../../components/header/Header";
import "./Welcome.scss";

interface WelcomeProps {}

function Welcome(props: WelcomeProps) {
  return (
    <div data-id="welcome" className="stromae-welcome">
      <Header />
      Welcome
    </div>
  );
}

export default Welcome;

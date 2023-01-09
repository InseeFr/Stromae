import { useParams } from "react-router-dom";
import "./Welcome.scss";

type WelcomeParams = {
  survey?: string;
};

interface WelcomeProps {}

function Welcome(props: WelcomeProps) {
  let { survey } = useParams<WelcomeParams>();
  console.log({ survey });

  return (
    <div data-id="welcome" className="stromae-welcome">
      Welcome
    </div>
  );
}

export default Welcome;

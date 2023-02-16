import { useEffect, useState, useRef } from "react";
import { LunaticSource } from "../../typeLunatic/type-source";
import { useOidcAccessToken } from "../../lib/oidc";
import surveyApi from "../../lib/surveys/surveysApi";
import Orchestrator from "./Orchestrator";

type LoadSourceDataProps = {
  survey?: string;
  unit?: string;
  children?: JSX.Element | Array<JSX.Element>;
};

function LoadSourceData(props: LoadSourceDataProps) {
  const alreadyDone = useRef(false);
  const { survey, children } = props;
  const [source, setSource] = useState<LunaticSource | undefined>(undefined);
  const { accessToken } = useOidcAccessToken();

  useEffect(
    function () {
      if (!alreadyDone.current) {
        (async function () {
          if (survey && accessToken) {
            alreadyDone.current = true;
            setSource(await surveyApi.getSurvey(survey, accessToken));
          }
        })();
      }
    },
    [survey, accessToken, alreadyDone]
  );

  if (source) {
    return <Orchestrator source={source}>{children}</Orchestrator>;
  }
  return <>Skelleton please</>;
}

export default LoadSourceData;

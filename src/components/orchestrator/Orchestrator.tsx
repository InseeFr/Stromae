import { useLunatic } from "@inseefr/lunatic";
import { cloneElement, PropsWithChildren } from "react";
import { LunaticSource, ComponentType } from "../../typeLunatic/type-source";

export type OrchestratorProps = {
  source: LunaticSource;
  children?: JSX.Element | Array<JSX.Element>;
};

const empty = {};

export type OrchestratedElement = {
  readonly getComponents?: () => Array<ComponentType>;
  readonly goPreviousPage?: () => void;
  readonly goNextPage?: () => void;
  // goToPage,
  // getErrors,
  // getModalErrors,
  // getCurrentErrors,
  // pageTag,
  readonly isFirstPage?: boolean;
  readonly isLastPage?: boolean;
  // pager,
  // waiting,
  // getData,
};

/**
 * Provider pas encore à dispo dans la version en ligne de lunatic.
 * @param param0
 * @returns
 */
function MockProvider({ children }: { children?: PropsWithChildren }) {
  return <>{children}</>;
}

function Orchestrator(props: OrchestratorProps) {
  const { source, children } = props;
  const {
    getComponents,
    goPreviousPage,
    goNextPage,
    isFirstPage,
    isLastPage,
    Provider = MockProvider,
  } = useLunatic(source, empty, empty);

  if (children) {
    const effective: Array<JSX.Element> = Array.isArray(children)
      ? children
      : [children];

    return (
      <Provider>
        {effective.map(function (element, key) {
          return cloneElement(
            element as React.ReactElement<OrchestratedElement>,
            {
              getComponents,
              goPreviousPage,
              goNextPage,
              isFirstPage,
              isLastPage,
              key,
            }
          );
        })}
      </Provider>
    );
  }
  return null;
}

export default Orchestrator;

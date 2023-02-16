import { useLunatic } from "@inseefr/lunatic";
import { cloneElement, PropsWithChildren } from "react";
import {
  LunaticSource,
  ComponentType,
  LunaticError,
} from "../../typeLunatic/type-source";

export type OrchestratorProps = {
  source: LunaticSource;
  children?: JSX.Element | Array<JSX.Element>;
};

export type OrchestratedElement = {
  readonly getComponents?: () => Array<ComponentType>;
  readonly goPreviousPage?: () => void;
  readonly goNextPage?: () => void;
  readonly goToPage?: () => void;
  // getErrors,
  // getModalErrors,
  readonly getCurrentErrors?: () => Array<LunaticError>;
  // pageTag,
  readonly isFirstPage?: boolean;
  readonly isLastPage?: boolean;
  // pager,
  // waiting,
  readonly getData?: () => any;
  readonly onChange?: () => void;
};

/**
 * Provider pas encore à dispo dans la version en ligne de lunatic.
 * @param param0
 * @returns
 */
function MockProvider({ children }: { children?: PropsWithChildren }) {
  return <>{children}</>;
}

const empty = {};

const args = {};

function Orchestrator(props: OrchestratorProps) {
  const { source, children } = props;

  const {
    getComponents,
    goPreviousPage,
    goNextPage,
    isFirstPage,
    isLastPage,
    goToPage,
    getCurrentErrors,
    onChange,
    getData,
    Provider = MockProvider,
  } = useLunatic(source, empty, args);

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
              goToPage,
              getCurrentErrors,
              key,
              onChange,
              getData,
            }
          );
        })}
      </Provider>
    );
  }
  return null;
}

export default Orchestrator;

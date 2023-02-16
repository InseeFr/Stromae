import { OrchestratedElement } from "../../components/orchestrator";
import * as lunatic from "@inseefr/lunatic";
import { useEffect, useState } from "react";
import { ComponentType } from "../../typeLunatic/type-source";

export enum ComponentEnum {
  Sequence = "Sequence", //
  Subsequence = "Subsequence",
  RosterForLoop = "RosterForLoop",
  Loop = "Loop",
  Table = "Table",
  Input = "Input",
  InputNumber = "InputNumber",
  Datepicker = "Datepicker",
  CheckboxGroup = "CheckboxGroup",
  CheckboxOne = "CheckboxOne",
  CheckboxBoolean = "CheckboxBoolean",
  Radio = "Radio",
  Dropdown = "Dropdown",
  Textarea = "Textarea",
  FilterDescription = "FilterDescription",
  PairwiseLinks = "PairwiseLinks",
  Suggester = "Suggester",
}

function Formulaire(props: OrchestratedElement) {
  const [components, setComponents] = useState<Array<ComponentType>>([]);
  const { getComponents } = props;

  useEffect(
    function () {
      if (typeof getComponents === "function") {
        setComponents(getComponents());
      }
    },
    [getComponents]
  );

  return (
    <form>
      {components.map(function (component: ComponentType) {
        const { componentType, id } = component;

        if (componentType in lunatic) {
          const Component = lunatic[componentType];

          return (
            <div className="lunatic lunatic-component" key={`component-${id}`}>
              <Component key={id} {...component} />
            </div>
          );
        }
        return null;
      })}
    </form>
  );
}

export default Formulaire;

// declarations, label, id, style

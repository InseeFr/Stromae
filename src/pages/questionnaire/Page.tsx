import { OrchestratedElement } from "../../components/orchestrator";
import * as lunatic from "@inseefr/lunatic";
import { useEffect, useState } from "react";
import { ComponentType } from "../../typeLunatic/type-source";

export enum ComponentEnum {
  Sequence = "Sequence",
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

function Page(props: OrchestratedElement) {
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
    <div>
      {components.map(function (component: ComponentType) {
        const { componentType, declarations, label, id } = component;
        switch (componentType) {
          case ComponentEnum.Sequence:
            return (
              <lunatic.Sequence
                key={id}
                id={id}
                declarations={declarations}
                label={label}
              />
            );
          default:
            return null;
        }
        // if (componentType in lunatic) {
        //   const Component = lunatic[componentType];

        //   return <Component key={id} />;
        // }
      })}
    </div>
  );
}

export default Page;

// declarations, label, id, style

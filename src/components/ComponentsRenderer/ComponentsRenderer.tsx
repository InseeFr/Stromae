import * as lunatic from '@inseefr/lunatic';
import {OrchestratedElement} from '../../typeStromae/type';
import {LunaticComponentContainer} from '../formulaire/LunaticComponentContainer';

type Props = {
    only?: string[];
    except?: string[];
} & Pick<OrchestratedElement, "currentErrors" | "disabled" | "getComponents">

export function ComponentsRenderer({getComponents, currentErrors, disabled = false, only, except}: Props) {
    const validComponents = getComponents?.({only, except}).filter(c => c.componentType in lunatic) ?? []
    return (
        <>
            {validComponents.map((component) => {
                const {componentType, id} = component;
                const Component = lunatic[componentType];

                return (
                    <LunaticComponentContainer key={id} id={id}>
                        <Component
                            key={id}
                            {...component}
                            errors={currentErrors}
                            disabled={disabled}
                        />
                    </LunaticComponentContainer>
                );
            })}
        </>
    )
}

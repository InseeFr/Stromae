import * as lunatic from '@inseefr/lunatic';
import { useEffect, useState } from 'react';
import { ComponentType } from '../../typeLunatic/type-source';
import { OrchestratedElement } from '../../typeStromae/type';
import { LunaticComponentContainer } from './LunaticComponentContainer';

export function Formulaire(props: OrchestratedElement) {
	const { getComponents, currentErrors, disabled = false, handleGoIteration } = props;
	const [components, setComponents] = useState<Array<ComponentType>>([]);

	useEffect(() => {
		if (typeof getComponents === 'function') {
			setComponents(getComponents());
		}
	}, [getComponents]);

	return (
		<form
      id="stromae-form"
    >
			{components.map((component: ComponentType) => {
				const { componentType, id } = component;
				if (componentType in lunatic) {
					const Component = lunatic[componentType];

					return (
						<LunaticComponentContainer key={id} id={id}>
							<Component
								key={id}
								{...component}
								errors={currentErrors}
								disabled={disabled}
								handleGoIteration={handleGoIteration}
							/>
						</LunaticComponentContainer>
					);
				}
				return null;
			})}
		</form>
	);
}

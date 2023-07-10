import * as lunatic from '@inseefr/lunatic';
import { useEffect, useState } from 'react';
import { ComponentType } from '../../typeLunatic/type-source';
import { OrchestratedElement } from '../../typeStromae/type';
import { LunaticComponentContainer } from '../formulaire/LunaticComponentContainer';
import { fr } from '@codegouvfr/react-dsfr';

export function WhyThisQuestion(props: OrchestratedElement) {
	const { getComponents, currentErrors, disabled = false } = props;
	const [components, setComponents] = useState<Array<ComponentType>>([]);

	useEffect(() => {
		if (typeof getComponents === 'function') {
			setComponents(getComponents());
		}
	}, [getComponents]);

	return (
		<div style={{ marginTop: fr.spacing("5v") }}>
			{components.map((component: ComponentType) => {
				const { componentType, id } = component;
				if (componentType in lunatic && componentType === 'Accordion') {
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
				}
				return null;
			})}
		</div>
	);
}

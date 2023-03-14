import { OrchestratedElement } from '../../components/orchestrator';
import * as lunatic from '@inseefr/lunatic';
import { useEffect, useState } from 'react';
import { ComponentType, LunaticError } from '../../typeLunatic/type-source';
import { LunaticComponentContainer } from './LunaticComponentContainer';

function getErrors(
	getCurrentErrors?: () => Record<string, Array<LunaticError>>
) {
	if (typeof getCurrentErrors === 'function') {
		return getCurrentErrors();
	}

	return [];
}

export function Formulaire(props: OrchestratedElement) {
	const { getComponents, getCurrentErrors } = props;
	const [components, setComponents] = useState<Array<ComponentType>>([]);
	const errors = getErrors(getCurrentErrors);

	useEffect(
		function () {
			if (typeof getComponents === 'function') {
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
						<LunaticComponentContainer key={id} id={id}>
							<Component key={id} {...component} errors={errors} />
						</LunaticComponentContainer>
					);
				}
				return null;
			})}
		</form>
	);
}

import * as lunatic from '@inseefr/lunatic';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ComponentType } from '../../typeLunatic/type-source';
import { OrchestratedElement } from '../../typeStromae/type';
import { uriPostEnvoi, uri404 } from '../../lib/domainUri';
import { LunaticComponentContainer } from './LunaticComponentContainer';

export function Formulaire(props: OrchestratedElement) {
	const { getComponents, currentErrors, disabled = false, goNextPage = () => null, isLastPage } = props;
	const [components, setComponents] = useState<Array<ComponentType>>([]);
  const navigate = useNavigate();
  const { unit, survey } = useParams();

	useEffect(
		() => {
			if (typeof getComponents === 'function') {
				setComponents(getComponents());
			}
		},
		[getComponents]
	);

  const handleSubmit = useCallback((element: React.FormEvent<HTMLFormElement>) => {
    element.preventDefault()
		if (isLastPage) {
			try {
				navigate(uriPostEnvoi(survey, unit));
			} catch (e) {
				navigate(uri404());
			}
		}
		goNextPage();
	}, [goNextPage, isLastPage, unit, survey, navigate])

	return (
		<form onSubmit={handleSubmit}>
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
							/>
						</LunaticComponentContainer>
					);
				}
				return null;
			})}
		</form>
	);
}

import * as lunatic from '@inseefr/lunatic';
import { ComponentType } from '../../typeLunatic/type-source';
import { OrchestratedElement } from '../../typeStromae/type';
import { LunaticComponentContainer } from '../formulaire/LunaticComponentContainer';

export function ComponentsRenderer(props: OrchestratedElement) {
	const { getComponents, currentErrors, disabled = false, only, except } = props;
	const components = getComponents?.().filter((component) => {
		const { componentType } = component;

		return (!only || (only && only.includes(componentType))) &&
		(!except || (except && !(except.includes(componentType))))
	})

	return (
		<>
			{components?.map((component: ComponentType) => {
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
		</>
	)
}

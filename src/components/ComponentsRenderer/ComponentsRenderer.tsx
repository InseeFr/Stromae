import * as lunatic from '@inseefr/lunatic';
import { OrchestratedElement } from '../../typeStromae/type';
import { LunaticComponentContainer } from '../formulaire/LunaticComponentContainer';
import { LunaticComponents } from '@inseefr/lunatic';
import type { ReactNode } from 'react';

type Props = {
	only?: string[];
	except?: string[];
	// Key that trigger a new autofocus on the first field
	focusKey?: string;
} & Pick<OrchestratedElement, 'currentErrors' | 'disabled' | 'getComponents'>;

export function ComponentsRenderer(props: Props) {
	const {
		getComponents,
		currentErrors,
		disabled = false,
		only,
		except,
		focusKey,
		...rest
	} = props;
	const validComponents =
		getComponents?.({ only, except }).filter(
			(c) => c.componentType in lunatic
		) ?? [];

	return (
		<LunaticComponents
			autoFocusKey={computeFocusKey(focusKey, currentErrors)}
			components={validComponents as any}
			componentProps={() => ({
				...rest,
				errors: currentErrors,
				disabled,
			})}
			wrapper={({ children, id }: { children: ReactNode; id: string }) => (
				<LunaticComponentContainer id={id} children={children} />
			)}
		/>
	);
}

const computeFocusKey = (
	base?: string,
	currentErrors?: Record<string, unknown>
) => {
	if (!base) {
		return null;
	}
	if (currentErrors) {
		return [base, ...Object.keys(currentErrors)].join('-');
	}
	return currentErrors;
};

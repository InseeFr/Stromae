import { PropsWithChildren } from 'react';
import { OrchestratedElement } from '../../typeStromae/type';
import { CloneElements } from '../orchestrator/CloneElements';
import { Grid } from './Grid';

export function OrchestratedGrid(
	props: PropsWithChildren<OrchestratedElement>
) {
	const { children, ...rest } = props;
	return (
		<Grid>
			<CloneElements<OrchestratedElement> {...rest}>{children}</CloneElements>
		</Grid>
	);
}

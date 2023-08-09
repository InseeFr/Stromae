import { useEffect } from 'react';
import { OrchestratedElement, CollectStatusEnum } from '../../typeStromae/type';
import { useNavigate, useParams } from 'react-router';
import { uri404, uriPostEnvoi } from '../../lib/domainUri';

export function RedirectIfValidated(props: OrchestratedElement) {
	const { collectStatus } = props;
	const { unit, survey } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (collectStatus === CollectStatusEnum.Validated) {
			if (unit && survey) {
				navigate(uriPostEnvoi(survey, unit));
			} else {
				navigate(uri404());
			}
		}
	}, [collectStatus, navigate, unit, survey]);

	return null;
}

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CollectStatusEnum } from '../../typeStromae/type';
import { uri404, uriPostEnvoi } from '../../lib/domainUri';

/**
 * If collectStatus === Validated redirect user
 * to the postSubmit page.
 *
 */
export function useRedirectIfAlreadyValidated(collectStatus?: string) {
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
}

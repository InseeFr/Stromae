import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnvVar } from '../../utils/configuration/env';

const DEFAULT_SURVEY = getEnvVar('REACT_APP_DEFAULT_SURVEY');

export function RoutingPortail() {
	const navigate = useNavigate();

	useEffect(() => {
		if (DEFAULT_SURVEY) {
			navigate(`/questionnaire/${DEFAULT_SURVEY}`);
		} else {
			navigate(`/404`);
		}
	}, [navigate]);

	return <></>;
}

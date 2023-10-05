import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTypeEnum, environment } from '../../utils/read-env-vars';

const { DEFAULT_SURVEY, AUTH_TYPE } = environment;

export function RoutingPortail() {
	const navigate = useNavigate();

	useEffect(() => {
		if (AUTH_TYPE === AuthTypeEnum.None) {
			navigate(`/visualize`);
		} else if (DEFAULT_SURVEY) {
			navigate(`/questionnaire/${DEFAULT_SURVEY}`);
		} else {
			navigate(`/404`);
		}
	}, [navigate]);

	return <></>;
}

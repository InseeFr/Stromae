import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { environment } from '../../utils/read-env-vars';

const { DEFAULT_SURVEY } = environment;

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

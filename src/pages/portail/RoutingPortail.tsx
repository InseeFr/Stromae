import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_SURVEY = process.env.REACT_APP_DEFAULT_SURVEY;

export function RoutingPortail() {
	const navigate = useNavigate();

	useEffect(
		function () {
			if (DEFAULT_SURVEY) {
				navigate(`/questionnaire/${DEFAULT_SURVEY}`);
			} else {
				navigate(`/404`);
			}
		},
		[navigate]
	);

	return <></>;
}

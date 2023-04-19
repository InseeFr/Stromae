import { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useRemote } from '../orchestrator/useRemote';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { Skeleton } from '@mui/material';
import { ReactComponent as Confirmation } from '../../assets/confirmation.svg';
import AdditionalInformation from './AdditionalInformation';
import {
	MetadataSurvey,
	OrchestratedElement,
	SurveyUnitData,
} from '../../typeStromae/type';

function parseDate(date?: number) {
	if (date !== undefined) {
		return moment(date).locale('fr').format('Do MMMM YYYY [à] h:mm');
	}
	return '';
}

export function PostSubmitSurvey(
	props: PropsWithChildren<OrchestratedElement>
) {
	const navigate = useNavigate();

	const { getMetadata, getSurveyUnitData } = useContext(loadSourceDataContext);
	const metadata = useRemote<MetadataSurvey>(getMetadata, navigateError);
	const surveyUnitData = useRemote<SurveyUnitData>(
		getSurveyUnitData,
		navigateError
	);
	const submit = metadata?.Submit;
	const submissionDate = parseDate(surveyUnitData?.stateData?.date);
	const DescriptionAdditional = submit?.DescriptionAdditional ?? null;

	function navigateError() {
		navigate('/');
	}

	if (!metadata) {
		return <Skeleton />;
	}

	return (
		<div className="fr-grid-row fr-my-6w fr-my-md-12w">
			<div className="fr-col-12 fr-col-lg-6 fr-col-offset-lg-1">
				<h1>L'Insee vous remercie pour votre collaboration à cette enquête.</h1>
				<p className="fr-text--lead">
					Vos réponses ont été envoyées le {submissionDate}.
					{DescriptionAdditional}
				</p>
				<Button>Télécharger l'accusé de réception</Button>
			</div>
			<div className="fr-col-lg-3 fr-col-offset-lg-1 fr-col-12 fr-col--middle fr-btns-group--center">
				<Confirmation />
			</div>
			<AdditionalInformation submit={submit} />
		</div>
	);
}

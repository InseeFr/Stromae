import { useContext, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fr } from '@codegouvfr/react-dsfr';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { format } from 'date-fns';
import { fr as localeFr } from 'date-fns/esm/locale';
import { useRemote } from '../orchestrator/useRemote';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { Skeleton } from '@mui/material';
import Confirmation from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/success.svg';

import AdditionalInformation from './AdditionalInformation';
import { MetadataSurvey, SurveyUnitData } from '../../typeStromae/type';
import { uri404 } from '../../lib/domainUri';

function parseDate(date?: number) {
	if (date !== undefined) {
		return format(new Date(date), 'EEEE d LLLL, à HH:mm', { locale: localeFr });
	}
	return '';
}

/*
 * Trouver une librairie plus sure.
 */
function download(data: BlobPart, unit: string) {
	const url = URL.createObjectURL(new Blob([data]));
	const aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = `deposit-proof-${unit}.pdf`;
	aLink.click();
}

export function PostSubmitSurvey() {
	const navigate = useNavigate();
	const { unit } = useParams();
	const { getMetadata, getSurveyUnitData, getDepositProof } = useContext(
		loadSourceDataContext
	);

	function navigateError() {
		navigate(uri404());
	}

	const handleDepositProof = useCallback(async () => {
		if (unit) {
			download(await getDepositProof(unit), unit);
		}
		return null;
	}, [unit, getDepositProof]);

	const metadata = useRemote<MetadataSurvey>(getMetadata, navigateError);
	const surveyUnitData = useRemote<SurveyUnitData>(
		getSurveyUnitData,
		navigateError
	);
	const submit = metadata?.Submit;
	const submissionDate = parseDate(surveyUnitData?.stateData?.date);
	const DescriptionAdditional = submit?.DescriptionAdditional ?? null;

	if (!metadata) {
		return <Skeleton />;
	}

	return (
		<>
			<div className={fr.cx('fr-col-12')}>
				<div className={fr.cx('fr-container')}>
					<div
						className={fr.cx(
							'fr-grid-row',
							'fr-grid-row--center',
							'fr-grid-row--middle',
							'fr-my-6w',
							'fr-my-md-12w'
						)}
					>
						<div
							className={fr.cx(
								'fr-col-12',
								'fr-col-offset-lg-1',
								'fr-col-lg-7',
								'fr-col-xl-7'
							)}
						>
							<h2>
								L'Insee vous remercie pour votre collaboration à cette enquête.
							</h2>
							<p className={fr.cx('fr-text--lead')}>
								Vos réponses ont été envoyées le {submissionDate}.&nbsp;
								{DescriptionAdditional}
							</p>
							<Button onClick={handleDepositProof}>
								Télécharger l'accusé de réception
							</Button>
						</div>
						<div
							className={fr.cx(
								'fr-col-lg-3',
								'fr-col-xl-3',
								'fr-col-offset-lg-1',
								'fr-col-12',
								'fr-col--middle',
								'fr-btns-group--center'
							)}
						>
							<svg
								className={fr.cx('fr-artwork')}
								aria-hidden="true"
								viewBox="0 0 80 80"
								width="200px"
								height="200px"
							>
								<use
									className={fr.cx('fr-artwork-decorative')}
									xlinkHref={`${Confirmation}#artwork-decorative`}
								></use>
								<use
									className={fr.cx('fr-artwork-minor')}
									xlinkHref={`${Confirmation}#artwork-minor`}
								></use>
								<use
									className={fr.cx('fr-artwork-major')}
									xlinkHref={`${Confirmation}#artwork-major`}
								></use>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<AdditionalInformation submit={submit} />
		</>
	);
}

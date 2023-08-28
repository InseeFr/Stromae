import {
	PropsWithChildren,
	useState,
	useEffect,
	useRef,
	useContext,
} from 'react';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import { fr } from '@codegouvfr/react-dsfr';
import { OrchestratedElement } from '../../typeStromae/type';
import { SaveMessage } from './SaveMessage';
import { BannerAddress } from './BannerAddress';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { useAsyncEffect } from '../../hooks/useAsyncEffect';
import { createPersonalizationMap } from '../orchestrator/UseLunatic';

const useStyles = makeStyles()({
	container: {
		borderBottom: '1px solid var(--border-default-grey)',
	},
	badgeContainer: {
		minWidth: 'fit-content',
	},
	addressRow: {
		'@media (min-width: 48em)': {
			flexDirection: 'row-reverse',
		},
	},
});

// This component is displayed during a questionnaire.
// Its main role is to reassure users that their data is being saved.
// If a bannerAddress is provided through personalization in the SUData,
// this is displayed.

export function DraftBanner(props: PropsWithChildren<OrchestratedElement>) {
	const { waiting, savingFailure, currentChange } = props;
	const { classes, cx } = useStyles();
	// saved is used as a flag to display the save message (see SaveMessage.tsx)
	const [saved, setSaved] = useState(false);
	const [label, setlabel] = useState('');
	const isSaved = waiting && !savingFailure;
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const duration = 2_000;

	const { getSurveyUnitData } = useContext(loadSourceDataContext);

	useAsyncEffect(async () => {
		if (getSurveyUnitData) {
			const updatedSUData = await getSurveyUnitData();
			const newPersonalization: Record<string, string> =
				createPersonalizationMap(updatedSUData?.personalization || []);
			setlabel(
				newPersonalization.bannerLabel ? newPersonalization.bannerLabel : ''
			);
		}
	}, [getSurveyUnitData, currentChange, props]);

	useEffect(() => {
		if (!isSaved) {
			return;
		}
		if (timer.current) {
			// clear previous duration
			clearTimeout(timer.current);
		}
		setSaved(true);
		timer.current = setTimeout(() => {
			setSaved(false);
		}, duration);
	}, [isSaved]);

	useEffect(() => {
		// clear timer when component is unmounted
		return () => clearTimeout(timer.current as NodeJS.Timeout);
	}, []);

	return (
		<div className={cx(classes.container, 'fr-col-12', 'fr-py-2w', 'fr-mb-1w')}>
			<div className="fr-container">
				<div className="fr-grid-column">
					<div
						className={fr.cx(
							'fr-grid-row--no-gutters',
							'fr-grid-row',
							'fr-grid-row--middle'
						)}
					>
						<div
							className={cx(
								classes.addressRow,
								'fr-grid-row--no-gutters',
								'fr-grid-row'
							)}
						>
							<div
								className={cx(
									classes.badgeContainer,
									'fr-col-12',
									'fr-col-md-1',
									'fr-mr-1w',
									'fr-mb-1w',
									'fr-mb-md-0'
								)}
							>
								<Badge>BROUILLON</Badge>
							</div>
							<BannerAddress label={label} />
						</div>
						<SaveMessage saved={saved} />
					</div>
				</div>
			</div>
		</div>
	);
}

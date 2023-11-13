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

// checks if the list of bannerLabelDependencies includes a value that just changed
function dependenciesHaveChanged(
	currentChange?: { name: string },
	bannerLabelDependencies?: string | number | boolean | Array<string>
) {
	if (
		!currentChange ||
		!bannerLabelDependencies ||
		!Array.isArray(bannerLabelDependencies)
	) {
		return false;
	}
	return bannerLabelDependencies.includes(currentChange?.name);
}

// This component is displayed during a questionnaire.
// Its main role is to reassure users that their data is being saved.
// If a bannerAddress is provided through personalization in the SUData,
// this is displayed.

export function DraftBanner(props: PropsWithChildren<OrchestratedElement>) {
	const { savingFailure, currentChange, personalization } = props;
	const { classes, cx } = useStyles();
	// saved is used as a flag to display the save message (see SaveMessage.tsx)
	const [saved, setSaved] = useState(false);
	const [label, setlabel] = useState(personalization?.bannerLabel ?? '');
	const bannerLabelDependencies = personalization?.bannerLabelDependencies
		? personalization?.bannerLabelDependencies
		: [];
	const isSaved = savingFailure ? savingFailure.status === 200 : false;
	const timer = useRef<ReturnType<typeof setTimeout>>();
	const duration = 2_000;
	const personalizationLabel =
		typeof personalization?.bannerLabel === 'string'
			? personalization?.bannerLabel
			: '';
	const computedLabel = label ? label : personalizationLabel;

	const { getSurveyUnitData } = useContext(loadSourceDataContext);

	// personalization is loaded on refresh, but if this value changes, it is not updated by default.
	// By calling the API, we are sure to get the most recent update.
	useAsyncEffect(async () => {
		// We don't want to call the API all the time, so we check if the dependencies have changed then call the api
		if (
			getSurveyUnitData &&
			dependenciesHaveChanged(currentChange, bannerLabelDependencies)
		) {
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
		return () => clearTimeout(timer.current);
	}, []);

	return (
		<div
			className={cx(
				classes.container,
				fr.cx('fr-col-12', 'fr-py-2w', 'fr-mb-1w')
			)}
		>
			<div className={fr.cx('fr-container')}>
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
							fr.cx('fr-grid-row--no-gutters', 'fr-grid-row')
						)}
					>
						<div
							className={cx(
								classes.badgeContainer,
								fr.cx(
									'fr-col-12',
									'fr-col-md-1',
									'fr-mr-1w',
									'fr-mb-1w',
									'fr-mb-md-0'
								)
							)}
						>
							<Badge>BROUILLON</Badge>
						</div>
						<BannerAddress label={computedLabel as string} />
					</div>
					<SaveMessage saved={saved} />
				</div>
			</div>
		</div>
	);
}

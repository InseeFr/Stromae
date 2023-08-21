import { PropsWithChildren, useState, useEffect } from 'react';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import { fr } from '@codegouvfr/react-dsfr';
import { OrchestratedElement } from '../../typeStromae/type';
import { SaveMessage } from './SaveMessage';
import { BannerAddress } from './BannerAddress';

const useStyles = makeStyles()({
	container: {
		borderBottom: '1px solid var(--border-default-grey)',
	},
	badgeContainer: {
		minWidth: 'fit-content'
	},
	addressRow: {
		"@media (min-width: 48em)": {
			flexDirection: "row-reverse"
		}
	}
});

// This component is displayed during a questionnaire.
// Its main role is to reassure users that their data is being saved.
// If a bannerAddress is provided through personalization in the SUData,
// this is displayed.

export function DraftBanner(props: PropsWithChildren<OrchestratedElement>) {
	const { waiting, savingFailure, personalization } = props;
	const { classes, cx } = useStyles();
	// saved is used as a flag to display the save message (see SaveMessage.tsx)
	const [saved, setSaved] = useState(false);
	const duration = 5000;

	const address = personalization?.bannerAdress ?? ''

	useEffect(() => {
		if (!waiting || Boolean(savingFailure)) {
			return undefined;
		}
		setSaved(true);
		const t = setTimeout(() => {
			setSaved(false);
		}, duration);
		return () => clearTimeout(t)
	}, [waiting, savingFailure]);

	return (
		<div className={cx(classes.container, 'fr-col-12', 'fr-py-2w', 'fr-mb-1w')}>
			<div className="fr-container">
				<div className="fr-grid-column">
					<div className={fr.cx('fr-grid-row--no-gutters', 'fr-grid-row')}>
						<div className={cx(classes.addressRow, 'fr-grid-row--no-gutters', 'fr-grid-row')}>
							<div className={cx(classes.badgeContainer,'fr-col-12', 'fr-col-md-1', 'fr-mb-1w', 'fr-mr-1w' )}>
								<Badge>BROUILLON</Badge>
							</div>
							<BannerAddress address={address} />
						</div>
						<SaveMessage saved={saved} />
					</div>
				</div>
			</div>
		</div>
	);
}

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
		minWidth: 'fit-content',
	},
	addressRow: {
		'@media (min-width: 48em)': {
			flexDirection: 'row-reverse',
		},
	},
});

export function DraftBanner(props: PropsWithChildren<OrchestratedElement>) {
	const { waiting, savingFailure, personalization } = props;
	const { classes, cx } = useStyles();
	const [saved, setSaved] = useState(false);
	const timer = 1000;
	let address = '';

	if (personalization?.bannerAddress) {
		address = `${personalization.bannerAddress}`;
	}

	useEffect(() => {
		if (!waiting || Boolean(savingFailure)) {
			return;
		}
		setSaved(true);
		setTimeout(() => {
			setSaved(false);
		}, timer);
	}, [waiting, savingFailure]);

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
							<BannerAddress address={address} />
						</div>
						<SaveMessage saved={saved} />
					</div>
				</div>
			</div>
		</div>
	);
}

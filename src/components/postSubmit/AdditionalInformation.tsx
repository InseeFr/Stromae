import { useColors } from '@codegouvfr/react-dsfr/useColors';
import { LinkType, SubmitType } from '../../typeStromae/type';
import { fr } from '@codegouvfr/react-dsfr';

function FeedbackLink({
	href,
	imageSrc,
	label,
}: {
	href: string;
	imageSrc: string;
	label: string;
}) {
	if (href && imageSrc) {
		return (
			<a
				title={`${label} - ouvre une nouvelle fenêtre`}
				href={href}
				style={{ backgroundImage: 'none' }}
			>
				<img src={imageSrc} alt="" />
			</a>
		);
	} else if (href) {
		return (
			<a title={`${label} - ouvre une nouvelle fenêtre`} href={href}>
				{label}
			</a>
		);
	}
	return null;
}
function ProvideFeedback({
	submit,
	Feedback,
}: {
	submit: SubmitType;
	Feedback: LinkType;
}) {
	const { link, title } = Feedback;
	const { href, imageSrc, label } = link;

	if (submit && Feedback) {
		return (
			<div className={fr.cx('fr-col-12', 'fr-col-lg-5', 'fr-mt-2w')}>
				<h4 className={fr.cx('fr-h6')}>{title}</h4>
				<FeedbackLink href={href} imageSrc={imageSrc} label={label} />
			</div>
		);
	}
	return null;
}
function SeeResults({
	submit,
	Results,
}: {
	submit?: SubmitType;
	Results?: LinkType;
}) {
	if (submit && Results) {
		const { link, title } = Results;
		const { href, label } = link;
		return (
			<div
				className={fr.cx(
					'fr-col-12',
					'fr-col-lg-5',
					'fr-col-offset-lg-2',
					'fr-mt-4w',
					'fr-mt-md-2w'
				)}
			>
				<h4 className={fr.cx('fr-h6')}>{title}</h4>
				<a
					title={`${label} - ouvre une nouvelle fenêtre`}
					href={href}
					target="_blank"
					rel="noopener noreferrer"
				>
					{label}
				</a>
			</div>
		);
	}
	return null;
}

export default function AdditionalInformation({
	submit,
}: {
	submit?: SubmitType;
}) {
	const theme = useColors();

	if (submit) {
		const { TitleAdditionalInformation, Feedback, Results } = submit;

		const hasAdditionalInformation =
			submit && TitleAdditionalInformation && (Feedback || Results);
		if (hasAdditionalInformation) {
			return (
				<div
					className={fr.cx('fr-col-12')}
					style={{
						backgroundColor: theme.decisions.background.alt.blueFrance.default,
					}}
				>
					<div className={fr.cx('fr-container', 'fr-py-6w')}>
						<div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
							<div className={fr.cx('fr-col-12')}>
								<h3 className={fr.cx('fr-h5')}>{TitleAdditionalInformation}</h3>
							</div>

							<ProvideFeedback submit={submit} Feedback={Feedback} />
							<SeeResults submit={submit} Results={Results} />
						</div>
					</div>
				</div>
			);
		}
	}
	return null;
}

import { useColors } from '@codegouvfr/react-dsfr/useColors';
import { LinkType, SubmitType } from '../../typeStromae/type';
import { fr } from '@codegouvfr/react-dsfr';
import { Link } from 'react-router-dom';

function FeedbackLink({
	href,
	imageSrc,
	alt,
	label,
	title,
	target,
}: {
	href: string;
	alt: string;
	imageSrc: string;
	title: string;
	label: string;
	target: string;
}) {
	if (href && imageSrc) {
		return (
			<Link
				title={title}
				to={href}
				style={{ backgroundImage: 'none' }}
				target={target}
			>
				<img src={imageSrc} alt={alt} />
			</Link>
		);
	} else if (href) {
		return (
			<Link title={title} to={href} target={target}>
				{label}
			</Link>
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

	if (submit && Feedback) {
		return (
			<div className={fr.cx('fr-col-12', 'fr-col-lg-5', 'fr-mt-2w')}>
				<h4 className={fr.cx('fr-h6')}>{title}</h4>
				<FeedbackLink
					alt={link.alt}
					title={link.title}
					href={link.href}
					target={link.target}
					imageSrc={link.imageSrc}
					label={link.label}
				/>
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
				<Link
					title={link.title}
					to={link.href}
					target={link.target}
					rel="noopener noreferrer"
				>
					{link.label}
				</Link>
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

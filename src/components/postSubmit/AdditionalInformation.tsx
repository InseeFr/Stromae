import { LinkType, SubmitType } from '../../typeStromae/type';

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
			<a title={`${label} - ouvre une nouvelle fenêtre`} href={href}>
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
			<div className="fr-p-md-3w fr-col-12 fr-col-lg-5 fr-col-offset-lg-1">
				<h6>{title}</h6>
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
			<div className="fr-p-md-3w fr-col-12 fr-col-lg-5 fr-col-offset-lg-1 fr-mt-5w fr-mt-md-0 fr-p-lg-3w">
				<h6>{title}</h6>
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
	if (submit) {
		const { TitleAdditionalInformation, Feedback, Results } = submit;

		const hasAdditionalInformation =
			submit && TitleAdditionalInformation && (Feedback || Results);
		if (hasAdditionalInformation) {
			return (
				<>
					<div className="fr-col-12 fr-col-lg-6 fr-mt-9w fr-col-offset-lg-1">
						<h2>{TitleAdditionalInformation}</h2>
					</div>
					<ProvideFeedback submit={submit} Feedback={Feedback} />
					<SeeResults submit={submit} Results={Results} />
				</>
			);
		}
	}
	return null;
}

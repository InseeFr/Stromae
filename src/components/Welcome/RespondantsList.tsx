export function RespondantsList(props: { respondants: string[] }) {
	const respondants = props.respondants;
	if (respondants && respondants.length > 0) {
		const listRespondants = respondants.map(
			(respondant: string, index: number) => <li key={index}>{respondant}</li>
		);
		return (
			<div className="fr-col-12">
				<h2>Qui doit répondre à ce questionnaire?</h2>
				<ul>{listRespondants}</ul>
			</div>
		);
	}
	return null;
}

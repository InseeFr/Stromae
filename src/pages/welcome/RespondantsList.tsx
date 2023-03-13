export function RespondantsList(metadata: any) {
    const respondants = metadata.Welcome.whoAnswers;
    if (respondants.length > 0) {
        const listRespondants = respondants.map((respondant: String) => <li>{respondant}</li>);
        return (
            <div className="fr-col-12">
                <h2>Qui doit répondre à ce questionnaire?</h2>
                <ul>{listRespondants}</ul>
            </div>
        )
    }
    return null;
}

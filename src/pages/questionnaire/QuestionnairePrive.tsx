import { OidcSecure } from '../../lib/oidc';
import useDocumentTitle from '../../useDocumentTitle';
import { QuestionnaireProps, QuestionnaireParams } from './Questionnaire';
import QuestionnairePublic from './QuestionnairePublic';

function Questionnaire({
	onChange,
	survey,
	unit,
}: QuestionnaireProps & QuestionnaireParams) {
	useDocumentTitle('Questionnaire');
	return (
		<OidcSecure>
			<QuestionnairePublic survey={survey} unit={unit} onChange={onChange} />
		</OidcSecure>
	);
}

export default Questionnaire;

import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../useDocumentTitle';
import QuestionnairePublic from './QuestionnairePublic';
import QuestionnairePrive from './QuestionnairePrive';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

export type QuestionnaireProps = {
	isPublic?: boolean;
	onChange?: (args: any) => void;
};

function Questionnaire(props: QuestionnaireProps) {
	const { survey, unit } = useParams<QuestionnaireParams>();
	const { isPublic, onChange } = props;
	useDocumentTitle('Questionnaire');

	if (isPublic) {
		return (
			<QuestionnairePublic survey={survey} unit={unit} onChange={onChange} />
		);
	}
	return <QuestionnairePrive survey={survey} unit={unit} onChange={onChange} />;
}

export default Questionnaire;

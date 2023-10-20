import { FrCxArg, fr } from '@codegouvfr/react-dsfr';
import DOMPurify from 'dompurify';

type ConvertContentProps = {
	content?: string | { value: string; type: 'html' | 'string' };
	classname?: FrCxArg;
};

function ConvertContent(props: ConvertContentProps) {
	if (!props.content) {
		return <></>;
	}
	if (typeof props.content === 'string') {
		return <p className={fr.cx(props.classname)}>{props.content}</p>;
	}
	if (props.content.type && props.content.type === 'string') {
		return <p>{props.content.value}</p>;
	} else if (props.content.type && props.content.type === 'html') {
		return (
			<p
				className={fr.cx(props.classname)}
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(props.content?.value, {
						ALLOWED_TAGS: [
							'b',
							'i',
							'a',
							'p',
							'ol',
							'ul',
							'li',
							'h1',
							'h2',
							'h3',
							'br',
						],
						ALLOWED_ATTR: ['target', 'href', 'title'],
					}),
				}}
			/>
		);
	}

	return <></>;
}

export default ConvertContent;

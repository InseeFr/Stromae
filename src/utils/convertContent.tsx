import { FrCxArg, fr } from '@codegouvfr/react-dsfr';
import DOMPurify from 'dompurify';

export type ConvertContentType =
	| string
	| { value: string; type: 'html' | 'string' };

type ConvertContentProps = {
	content?: ConvertContentType;
	className?: FrCxArg;
};

function ConvertContent(props: ConvertContentProps) {
	if (!props.content) {
		return <></>;
	}
	if (typeof props.content === 'string') {
		return <p className={fr.cx(props.className)}>{props.content}</p>;
	}
	if (props.content?.type === 'string') {
		return <p className={fr.cx(props.className)}>{props.content.value}</p>;
	}
	if (props.content?.type === 'html') {
		return (
			<p
				className={fr.cx(props.className)}
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

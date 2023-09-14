import DOMPurify from 'dompurify';

type ConvertContentProps = {
	content?: string | { value: string; type: 'html' | 'string' };
};

function ConvertContent(props: ConvertContentProps) {
	if (!props.content) {
		return <></>;
	}
	if (typeof props.content === 'string') {
		return <>{props.content}</>;
	}
	if (props.content.type && props.content.type === 'string') {
		return <span>{props.content.value}</span>;
	} else if (props.content.type && props.content.type === 'html') {
		return (
			<span
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(props.content?.value, {
						ALLOWED_TAGS: ['b', 'i', 'a', 'p', 'ul', 'li', 'h1', 'h2', 'h3'],
					}),
				}}
			/>
		);
	}

	return <></>;
}

export default ConvertContent;

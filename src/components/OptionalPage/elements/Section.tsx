import classnames from 'classnames';
import DOMPurify from 'dompurify';
import { SectionElement } from '../../../typeStromae/type';
import { fr } from '@codegouvfr/react-dsfr';

function Paragraph({ content, id, title }: { id?: string; content: string; title?: string }) {
	return (
		<>
		{title && <h4>{title}</h4> }
		<p
			className={fr.cx('fr-mt-4v')}
			key={`paragraph-${id}`}
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(content, {
					ALLOWED_TAGS: ['b', 'i', 'a', 'li', 'ul', 'h4'],
					ALLOWED_ATTR: ['target', 'href', 'title'],
				}),
			}} />
			</>
	);
}

function getContent(paragraphs: Object | string, id?: string) {
	if (typeof paragraphs === 'string') {
		return <Paragraph id={id} content={paragraphs} />;
	}
	if (Array.isArray(paragraphs)) {
		return paragraphs.map((p, id, index) => {
			const idParagraph = `paragraph-${id}-${index}`;
			return <Paragraph id={idParagraph} title={p.title} content={p.paragraph || p} key={idParagraph} />;
		});
	}
	return null;
}

export function Section(props: SectionElement) {
	const { title, paragraphs = {}, id, className } = props;

	return (
		<section
			id={id}
			className={title && classnames(className, fr.cx('fr-py-6v'))}
		>
			{title && <h3>{title}</h3>}
			{getContent(paragraphs, id)}
		</section>
	);
}

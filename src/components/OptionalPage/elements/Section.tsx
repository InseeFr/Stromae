import classnames from 'classnames';
import DOMPurify from 'dompurify';
import { SectionElement } from '../../../typeStromae/type';

function getContent(paragraphs: Array<string> | string, id?: string) {
	if (typeof paragraphs === 'string') {
		return (
			<p
				className="fr-mt-4v fr-mb-0"
				key={`paragraph-${id}`}
				dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraphs) }}
			></p>
		);
	}
	if (Array.isArray(paragraphs)) {
		return paragraphs.map((p, id, index) => {
			return (
				<p
					className="fr-mt-4v fr-mb-0"
					key={`paragraph-${id}-${index}`}
					dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p) }}
				></p>
			);
		});
	}
	return null;
}

export function Section(props: SectionElement) {
	const { title, paragraphs = [], id, className } = props;

	return (
		<section id={id} className={classnames(className, 'fr-py-6v')}>
			<h3 className="fr-h5">{title}</h3>
			{getContent(paragraphs, id)}
		</section>
	);
}

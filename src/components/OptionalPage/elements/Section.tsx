import classnames from 'classnames';
import { SectionElement } from '../../../typeStromae/type';

export function Section(props: SectionElement) {
	const { title, content, id, className } = props;
	return (
		<div id={id} className={classnames(className)}>
			<h3>{title}</h3>
			<p dangerouslySetInnerHTML={{ __html: content }}></p>
		</div>
	);
}

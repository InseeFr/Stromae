import classnames from 'classnames';
import { TitleElement } from '../../../typeStromae/type';

export function Title(props: TitleElement) {
	const { title, id, className } = props;
	return (
		<h2 id={id} className={classnames(className, 'fr-mt-10v')}>
			{title}
		</h2>
	);
}

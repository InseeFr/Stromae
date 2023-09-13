import { TitleElement } from '../../../typeStromae/type';

export function Title(props: TitleElement) {
	const { title, id, className } = props;
	return (
		<h2 id={id} className={className}>
			{title}
		</h2>
	);
}

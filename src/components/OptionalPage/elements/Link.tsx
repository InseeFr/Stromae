import { LinkElement } from '../../../typeStromae/type';

export function Link({
	content,
	href,
	title,
	id,
	className,
	target,
}: LinkElement) {
	return (
		<a id={id} className={className} title={title} href={href} target={target}>
			{content}
		</a>
	);
}

import { ListElement } from '../../../typeStromae/type';
import { createPageElement } from '../OptionalPage';

export function List(props: ListElement) {
	const { id, className, items } = props;
	const li = items.map((sub, index) => {
		const subId = `sub-${id}-${index}`;
		const { element } = sub;
		return (
			<li key={subId}>
				{element ? createPageElement(element, `item-${subId}`) : null}
				{createPageElement(sub, subId)}
			</li>
		);
	});
	return (
		<ul id={id} className={className}>
			{li}
		</ul>
	);
}

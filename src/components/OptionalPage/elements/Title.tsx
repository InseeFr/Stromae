import classnames from 'classnames';
import { TitleElement } from '../../../typeStromae/type';
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb';

export function Title(props: TitleElement) {
	const { title, id, className } = props;
	return (
		<div>
			<Breadcrumb
					currentPageLabel={title}
					homeLinkProps={{
						to: '/'
					}}
					segments={[

					]}
				/>
			<h2 id={id} className={classnames(className)}>
				{title}
			</h2>
		</div>
	);
}

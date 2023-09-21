import classnames from 'classnames';
import { TitleElement } from '../../../typeStromae/type';
import { fr } from '@codegouvfr/react-dsfr';
import Button from '@codegouvfr/react-dsfr/Button';
import { Link } from 'react-router-dom';

export function Title(props: TitleElement) {
	const { title, id, className } = props;
	return (
		<div>
			<nav
				role="navigation"
				className={fr.cx('fr-breadcrumb')}
				aria-label="vous êtes ici :"
			>
				<Button
					className={fr.cx('fr-breadcrumb__button')}
					aria-expanded="false"
					aria-controls="breadcrumb-1"
				>
					Voir le fil d’Ariane
				</Button>
				<div className={fr.cx('fr-collapse')} id="breadcrumb-1">
					<ol className={fr.cx('fr-breadcrumb__list')}>
						<li>
							<Link className={fr.cx('fr-breadcrumb__link')} to="/">
								Accueil
							</Link>
						</li>
						<li>
							<a className={fr.cx('fr-breadcrumb__link')} aria-current="page">
								{title}
							</a>
						</li>
					</ol>
				</div>
			</nav>
			<h2 id={id} className={classnames(className)}>
				{title}
			</h2>
		</div>
	);
}

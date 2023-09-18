import classnames from 'classnames';
import { TitleElement } from '../../../typeStromae/type';
import { fr } from '@codegouvfr/react-dsfr';

export function Title(props: TitleElement) {
	const { title, id, className } = props;
	return (
		<div>
			<nav
				role="navigation"
				className={fr.cx('fr-breadcrumb')}
				aria-label="vous êtes ici :"
			>
				<button
					className={fr.cx('fr-breadcrumb__button')}
					aria-expanded="false"
					aria-controls="breadcrumb-1"
				>
					Voir le fil d’Ariane
				</button>
				<div className={fr.cx('fr-collapse')} id="breadcrumb-1">
					<ol className={fr.cx('fr-breadcrumb__list')}>
						<li>
							<a className={fr.cx('fr-breadcrumb__link')} href="/">
								Accueil
							</a>
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

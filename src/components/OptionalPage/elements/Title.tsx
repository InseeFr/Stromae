import classnames from 'classnames';
import { TitleElement } from '../../../typeStromae/type';
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb';

export function Title(props: TitleElement) {
	const { title, id, className } = props;
	return (
		<div>
			<nav
				role="navigation"
				className="fr-breadcrumb"
				aria-label="vous êtes ici :"
			>
				<button
					className="fr-breadcrumb__button"
					aria-expanded="false"
					aria-controls="breadcrumb-1"
				>
					Voir le fil d’Ariane
				</button>
				<div className="fr-collapse" id="breadcrumb-1">
					<ol className="fr-breadcrumb__list">
						<li>
							<a className="fr-breadcrumb__link" href="/">
								Accueil
							</a>
						</li>
						<li>
							<a className="fr-breadcrumb__link" aria-current="page">
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

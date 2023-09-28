import { Header } from './Header';
import { Footer } from './Footer';
import { Content } from './Content';
import { fr } from '@codegouvfr/react-dsfr';

export function Layout() {
	return (
		<div className={fr.cx('fr-container')} aria-live="polite" aria-busy="true">
			<title>Page en cours de chargement</title>
			<div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
				<Header />
				<Content />
				<Footer />
			</div>
		</div>
	);
}

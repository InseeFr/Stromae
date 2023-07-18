import { Header } from './Header';
import { Footer } from './Footer';
import { Content } from './Content';

export function Layout() {
	return (
		<div className="fr-container" aria-live="polite" aria-busy="true">
			<title>Page en cours de chargement</title>
			<div className="fr-grid-row fr-grid-row--center">
				<Header />
				<Content />
				<Footer />
			</div>
		</div>
	);
}
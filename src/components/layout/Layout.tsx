import {
	useEffect,
	useState,
	useRef,
	useContext,
	PropsWithChildren,
} from 'react';
import FooterType from '../footer/FooterType';
import HeaderType from '../header/HeaderType';
import Header from '../../components/header/Header';
import HeaderAuth from '../../components/header/HeaderAuth';
import Footer from '../../components/footer/Footer';
import SkipLinks from '@codegouvfr/react-dsfr/SkipLinks';
import LayoutPlaceholder from '../skeleton/Layout';
import Main from './Main';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';

type LayoutProps = {};

const defaultLinks = [
	{
		anchor: '#contenu',
		label: 'Contenu',
	},
];

function Layout({ children }: PropsWithChildren<LayoutProps>) {
	const alreadyLoad = useRef(false);
	const [header, setHeader] = useState<HeaderType | undefined>(undefined);
	const [footer, setFooter] = useState<FooterType | undefined>(undefined);
	const { getMetadata } = useContext(loadSourceDataContext);

	useEffect(
		function () {
			if (getMetadata && !alreadyLoad.current) {
				alreadyLoad.current = true;
				(async function () {
					const data = await getMetadata();
					if (data) {
						const { Header, Footer } = data;
						setHeader(Header);
						setFooter(Footer);
					} else throw new Error('metadata missing.');
				})();
			}
		},
		[getMetadata, alreadyLoad]
	);

	if (header && footer) {
		return (
			<>
				<SkipLinks links={defaultLinks} />
				<HeaderAuth>
					<Header header={header} />
				</HeaderAuth>
				<Main id="contenu">{children}</Main>
				<Footer footer={footer} />
			</>
		);
	}
	return <LayoutPlaceholder />;
}

export default Layout;

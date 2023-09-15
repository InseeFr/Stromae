import { FooterProps } from '@codegouvfr/react-dsfr/Footer';
import { RegisteredLinkProps } from '@codegouvfr/react-dsfr/link';

export type FooterType = FooterProps & {
	otherLinksProps: Array<RegisteredLinkProps>;
};

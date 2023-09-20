import { HeaderProps } from '@codegouvfr/react-dsfr/Header';
import type { ItemOf } from '../../type.utils';

export type HeaderType = HeaderProps & {};

export type HeaderQuickAccessItem = ItemOf<
	Required<HeaderType>['quickAccessItems']
>;

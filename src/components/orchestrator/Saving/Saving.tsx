import { PropsWithChildren } from 'react';
import { OrchestratedElement } from '../../../typeStromae/type';
import { environment } from '../../../utils/read-env-vars';
import { SaveOnPage } from './SaveOnPage';
import { SaveOnSequence } from './SaveOnSequence';

// or sequence
const { SAVING_TIME } = environment;

/**
 * La sauveagerde des données pour la FE sde fait lors des changements de sequence et
 * à chaque changement de page pour le recensement.
 * La sauvegarde pour le FE consiste à envoyer en un seul transfert, l'ensemble des variables
 * du questionnaire. Le recensement se contente d'envoyer les variable ayant des changements effectifs.
 * Des clefs dans env permettent de combiner les comportement.
 * Il serait aopportun de convenir d'un comportement commun quand cela sera possible.
 * Sauvegrader régulièrement des petits paquets de données semble une option préférable.
 * @param props
 * @returns
 */
export function Saving(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;

	if (SAVING_TIME === 'sequence') {
		return <SaveOnSequence {...rest}>{children}</SaveOnSequence>;
	}
	return <SaveOnPage {...rest}>{children}</SaveOnPage>;
}

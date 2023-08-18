import { PropsWithChildren, useState, useEffect } from 'react';
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import { OrchestratedElement, PersonalizationData } from '../../typeStromae/type';
import { fr } from '@codegouvfr/react-dsfr';

const useStyles = makeStyles()({
    container: {
        borderBottom: "1px solid var(--border-default-grey)",
    },
});


export function DraftBanner(props: PropsWithChildren<OrchestratedElement> & {personalization: PersonalizationData[]}) {
    const { waiting, savingFailure, personalization } = props;
    const { classes, cx } = useStyles();
    const [saved, setSaved] = useState(false);
		const [address, setAddress] = useState<string | undefined>(undefined)
    const timer = 2000;

		setAddress(personalization.filter((item) => item.name === "bannerAddress")[0].value)


    useEffect(() => {
        if (waiting && Boolean(!savingFailure)) {
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
            }, timer);
        }
    }, [waiting, savingFailure]);
    // TO DO: get data from personalization annd remove the getData method props
    // TO DO: mobile screen responsive
    return (
        <div className={cx(classes.container, "fr-col-12", "fr-py-2w", "fr-mb-1w")}>
            <div className="fr-container">
            <div className="fr-grid-column">
                {address && <div className={fr.cx("fr-grid-row--no-gutters","fr-grid-row")}>
                    <div className=''>
                    <span className="fr-text--bold fr-mr-2w">{address}</span>
                    </div>
                    <div className=''>
                    <Badge>BROUILLON</Badge>
                    </div>
                </div>}
                <div className={"fr-p-1v"}>
                    {!address && <Badge className="fr-mx-2w">BROUILLON</Badge>}
                    {saved ? <span><i className="fr-icon-checkbox-circle-fill fr-label--success fr-mr-1v" />Brouillon enregistré.</span> :
                        <span>Vos réponses sont enregistrées automatiquement à chaque chargement de page.</span>}
                </div>
            </div>
            </div>
        </div>
    );
}

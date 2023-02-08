import { FooterProps } from "@codegouvfr/react-dsfr/Footer";
import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";
import axios from "axios";
import { ReactNode } from "react";

export type HeaderType = {
    brandTop: string,
    operatorLogo?: {
        alt: string,
        imgUrl: string,
        orientation: "horizontal" | "vertical"
    },
    serviceTitle: string
}

export type FooterType = {
    brandTop: string,
    accessibility: "non compliant" | "partially compliant" | "fully compliant",
    contentDescription?: string,
    websiteMapLinkProps?: RegisteredLinkProps,
    accessibilityLinkProps?: RegisteredLinkProps,
    termsLinkProps?: RegisteredLinkProps,
    personalDataLinkProps?: RegisteredLinkProps,
    homeLinkProps: RegisteredLinkProps & {
        title: string;
    },
    bottomItems?: FooterProps.BottomItem[],
    license?: ReactNode,
    operatorLogo?: {
        alt: string,
        imgUrl: string,
        orientation: "horizontal" | "vertical"
    }
}

export interface MetadataSurvey {
    Header: HeaderType;
    Footer: FooterType;
}

/**
 * Un endpoint vers stromae-api pour recup les url spécifique à l'enquête plutôt que les coller dans l'url.
 * @param survey
 * @returns
 */

async function getMetadataSurvey(survey: string): Promise<MetadataSurvey | undefined> {
    try {
        // TODO: Faire en sorte que l'on puisse acceder aux fichiers externe de Stromae 
        const {
            data,
            // status 
        } = await axios.get<MetadataSurvey>("/rp/parametres.json")
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("error message: ", error.message)
        }
        return undefined
    }
}


export default getMetadataSurvey;

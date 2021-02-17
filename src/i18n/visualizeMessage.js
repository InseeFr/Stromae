import {
  DATA_EXAMPLE_URL,
  METADATA_EXAMPLE_URL,
  QUESTIONNAIRE_EXAMPLE_URL,
} from 'utils/constants';

const visualizeMessage = {
  visualizationTitlePage: {
    fr: 'Page de visualisation de questionnaire',
    en: 'Questionnaire preview page',
  },
  labelQuest: {
    fr: 'Questionnaire',
    en: 'Questionnaire',
  },
  helperTextQuest: {
    fr: `L'url d'un json de questionnaire au format Lunatic-model`,
    en: `The url of a json of questionnaire in Lunatic-model format`,
  },
  labelMetadata: {
    fr: 'Metadonnées',
    en: 'Metadata',
  },
  helperTextMetadata: {
    fr: `L'url d'un json de metadonnées de questionnaire`,
    en: `The url of a json of questionnaire metadata.`,
  },
  labelData: {
    fr: 'Données',
    en: 'Data',
  },
  helperTextData: {
    fr: `L'url d'un json de données (de réponse)`,
    en: `The url of a data (response) json.`,
  },
  accordionHelperTitle: {
    fr: 'Aide',
    en: 'Help',
  },
  accordionHelperSubtitle: {
    fr: 'Comment visualiser un questionnaire ?',
    en: 'How do I view a questionnaire ?',
  },
  accordionHelperBody: {
    fr: `Chacun des 3 champs est optionnel, si aucune valeur n'est renseignée, les valeurs par défaut sont appliquées. \n\n Les valeurs par défaut des json sont disponible ici : \n - [questionnaire](${QUESTIONNAIRE_EXAMPLE_URL}) \n - [metadonnées](${METADATA_EXAMPLE_URL}) \n - [données](${DATA_EXAMPLE_URL})`,
    en: `Each of the 3 fields is optional, if no value is entered, the default values are applied. \n\n Default json values are available here : \n - [questionnaire](${QUESTIONNAIRE_EXAMPLE_URL}) \n - [metadata](${METADATA_EXAMPLE_URL}) \n - [data](${DATA_EXAMPLE_URL})`,
  },
};

export default visualizeMessage;

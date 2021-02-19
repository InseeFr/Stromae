import { DEFAULT_DATA_URL, DEFAULT_METADATA_URL } from 'utils/constants';
import buttonMessage from './buttonMessage';

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
    en: 'How do I preview a questionnaire ?',
  },
  accordionHelperBody: {
    fr: `Seul le champ "Questionnaire" est obligatoire, si aucune valeur n'est renseignée pour les autres champs, les valeurs par défaut sont appliquées. \n\n Les valeurs par défaut des json sont disponible ici : \n - [metadonnées](${DEFAULT_METADATA_URL}) \n - [données](${DEFAULT_DATA_URL}) \n\n Vous pouvez également choisir un exemple de questionnaire directement. \n\n Une fois les valeurs renseignées, il vous suffit de cliquer sur le bouton "${buttonMessage?.visualize?.fr}".`,
    en: `Only the "Questionnaire" field is mandatory, if no value is filled in for the other fields, the default values are applied. \n\n Default json values are available here : \n - [metadata](${DEFAULT_METADATA_URL}) \n - [data](${DEFAULT_DATA_URL}) \n\n You can also choose an example questionnaire directly. \n\n Once you have filled in the values, just click on the "${buttonMessage?.visualize?.en}" button.`,
  },
  chooseExamples: {
    fr: 'Ou choisir un exemple :',
    en: 'Or choose an example',
  },
  labelExamples: {
    fr: 'Exemples',
    en: 'Examples',
  },
  labelNone: { fr: 'Aucun', en: 'None' },
};

export default visualizeMessage;

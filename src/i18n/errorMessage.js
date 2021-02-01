const errorMessage = {
  getError401: {
    fr: 'Vous semblez avoir été déconnecté.',
    en: 'Changing the sequence',
  },
  getError403: {
    fr: questionnaire =>
      `Vous n'êtes pas autorisé à accéder ${
        questionnaire ? 'au questionnaire.' : 'aux données du répondant.'
      }`,
    en: questionnaire =>
      `You are not authorized to access ${
        questionnaire ? 'the questionnaire.' : `the respondent's data.`
      }`,
  },
  getError404: {
    fr: questionnaire =>
      `${
        questionnaire
          ? "Le questionnaire n'existe pas."
          : "Il n'y a aucune donnée pour ce répondant."
      }`,
    en: questionnaire =>
      `${
        questionnaire
          ? 'The questionnaire does not exist.'
          : 'There is no data for this respondent.'
      }`,
  },
  getErrorServeur: {
    fr: `Il semble qu'il y ait une erreur côté serveur.`,
    en: `There seems to be an error on the server side.`,
  },
  getUnknownError: {
    fr: `Une erreur inconnue s'est produite, veuillez contacter l'assistance ou réessayer plus tard.`,
    en: `An unknown error occurred, please contact support or try again later.`,
  },
};

export default errorMessage;

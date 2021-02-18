const endHousehold = {
  title: { fr: `Fin`, en: `End` },
  confirmation: {
    fr: `"Votre questionnaire a bien été expédié " || validatedDate || "."`,
    en: `"Your questionnaire has been sent " || validatedDate || "."`,
  },
  thanks: {
    fr: `L'Insee vous remercie de votre collaboration à cette enquête.`,
    en: `INSEE thanks you for your collaboration in this survey.`,
  },
  pdfMessage: {
    fr: `Télécharger la preuve de votre participation à l'enquête`,
    en: `Download the proof of your participation in the survey`,
  },
  youCanQuit: {
    fr: 'Vous pouvez à présent vous déconnecter.',
    en: 'You can now log out.',
  },
};

const endDefault = {
  title: { fr: 'Fin', en: 'End' },
  body: {
    fr: [`Page de fin générique.`],
    en: ['Generic end page.'],
  },
  thanks: {
    fr: `L'Insee vous remercie de votre collaboration à cette enquête.`,
    en: `INSEE thanks you for your collaboration in this survey.`,
  },
  pdfMessage: {
    fr: `Télécharger la preuve de votre participation à l'enquête`,
    en: `Download the proof of your participation in the survey`,
  },
};

const endBusiness = {
  title: { fr: 'Fin', en: 'End' },
  body: {
    fr: [`Page de fin entreprise`],
    en: [`End page for business`],
  },
  thanks: {
    fr: `Merci`,
    en: `Thanks`,
  },
  pdfMessage: {
    fr: `Télécharger la preuve de votre participation à l'enquête`,
    en: `Download the proof of your participation in the survey`,
  },
};

const endMessage = {
  household: endHousehold,
  business: endBusiness,
  default: endDefault,
};

export const getEndPageMessage = inseeContext => endMessage[inseeContext];

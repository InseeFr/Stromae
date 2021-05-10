const confirmHousehold = {
  title: { fr: `Confirmation de validation`, en: `Validation confirmation` },
  body: {
    fr: [
      `Vous êtes sur le point de valider votre questionnaire, en êtes-vous sûr ? \n\n Après validation, vous ne pourrez plus modifier vos réponses.`,
    ],
    en: [`You are about to validate your questionnaire, are you sure?`],
  },
};

const confirmDefault = {
  title: { fr: 'Confirmation de validation', en: 'Validation confirmation' },
  body: {
    fr: [
      `Vous êtes sur le point de valider votre questionnaire, en êtes-vous sûr ? `,
    ],
    en: [`You are about to validate your questionnaire, are you sure?`],
  },
};

const confirmBusiness = {
  title: { fr: 'Confirmation de validation', en: 'Validation confirmation' },
  body: {
    fr: [
      `Vous êtes sur le point de valider votre questionnaire, en êtes-vous sûr ?`,
    ],
    en: [`You are about to validate your questionnaire, are you sure?`],
  },
};

const confirmMessage = {
  household: confirmHousehold,
  business: confirmBusiness,
  default: confirmDefault,
};

export const getConfirmationMessage = inseeContext =>
  confirmMessage[inseeContext];

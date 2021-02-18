import buttonMessage from '../buttonMessage';

const validationHousehold = {
  title: { fr: `Validation`, en: `Validation` },
  body: {
    fr: [
      `Vous êtes arrivé à la fin du questionnaire. \n\n Merci de cliquer sur le bouton "${buttonMessage.send.fr}" pour le transmettre à l'Insee.`,
      `Après envoi, vous ne pourrez plus modifier vos réponses en ligne. \n\n Pour toute modification, cliquer sur le bouton "${buttonMessage.back.fr}".`,
    ],
    en: [
      `You have reached the end of the questionnaire. \n\n Please click on the "${buttonMessage.send.en}" button to send it to INSEE.`,
      `After sending, you will not be able to modify your answers online. \n\n For any modification, click on the "${buttonMessage.back.en}" button.`,
    ],
  },
};

const validationeDefault = {
  title: { fr: `Validation`, en: `Validation` },
  body: {
    fr: [
      `Vous êtes arrivé à la fin du questionnaire. \n\n Merci de cliquer sur le bouton "${buttonMessage.send.fr}" pour le transmettre à l'Insee.`,
      `Après envoi, vous ne pourrez plus modifier vos réponses en ligne. \n\n Pour toute modification, cliquer sur le bouton "${buttonMessage.back.fr}".`,
    ],
    en: [
      `You have reached the end of the questionnaire. \n\n Please click on the "${buttonMessage.send.en}" button to send it to INSEE.`,
      `After sending, you will not be able to modify your answers online. \n\n For any modification, click on the "${buttonMessage.back.en}" button.`,
    ],
  },
};

const validationBusiness = {
  title: { fr: `Validation`, en: `Validation` },
  body: {
    fr: [
      `Vous êtes arrivé à la fin du questionnaire. \n\n Merci de cliquer sur le bouton "${buttonMessage.send.fr}" pour le transmettre à l'Insee.`,
      `Après envoi, vous ne pourrez plus modifier vos réponses en ligne. \n\n Pour toute modification, cliquer sur le bouton "${buttonMessage.back.fr}".`,
    ],
    en: [
      `You have reached the end of the questionnaire. \n\n Please click on the "${buttonMessage.send.end}" button to send it to INSEE.`,
      `After sending, you will not be able to modify your answers online. \n\n For any modification, click on the "${buttonMessage.back.en}" button.`,
    ],
  },
};

const validationMessage = {
  household: validationHousehold,
  business: validationBusiness,
  default: validationeDefault,
};

export const getValidationPageMessage = inseeContext =>
  validationMessage[inseeContext];

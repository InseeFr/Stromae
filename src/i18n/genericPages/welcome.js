const welcomeHousehold = {
  title: { fr: `Accueil`, en: `Welcome` },
  body: {
    fr: [
      `"Bienvenue sur le questionnaire de réponse à l'" || Enq_LibelleEnquete || ".\n\n" || Enq_ObjectifsCourts`,
      `"Qui doit répondre à ce questionnaire ?"`,
      `whoAnswers1 || "\n\n" || whoAnswers2 || "\n\n" || whoAnswers3`,
    ],
    en: [
      `"Welcome to ''" || Enq_LibelleEnquete || "'' questionnaire. \n\n" || Enq_ObjectifsCourts`,
      `"Who should answer this questionnaire ?"`,
      `whoAnswers1 || "\n\n" || whoAnswers2 || "\n\n" || whoAnswers3`,
    ],
  },
  legalTermsTitle: {
    fr: "Connaître le cadre légal de l'enquête ?",
    en: 'Know the legal terms of the survey ?',
  },
  legalTermsDetails: {
    fr: [
      `"Vu l'avis favorable du Conseil national de l'information statistique, cette enquête" || (if cast(Enq_CaractereObligatoire, boolean) then ", reconnue d’intérêt général et de qualité statistique, est obligatoire" else " est reconnue d'intérêt général et de qualité statistique sans avoir de caractère obligatoire") || ", en application de la [loi n° 51-711 du 7 juin 1951](" || Loi_statistique ||") sur l'obligation, la coordination et le secret en matière de statistiques."`,
      `"Visa n°" || Enq_NumeroVisa || " du Minsitre " || Enq_MinistereTutelle || ", valable pour l'année " || Enq_AnneeVisa || " - Arrêté en " || (if cast(Enq_ParutionJo,boolean) then (" date du " || Enq_DateParutionJo) else "cours de parution") || "."`,
      `"Les réponses à ce questionnaire sont protégées par le secret statistique et destinées à " || Enq_RespOperationnel || ". Le [règlement général 2016/679 du 27 avril 2016 sur la protection des données (RGPD)](" || Loi_rgpd || ") ainsi que la [loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés](" || Loi_informatique || "), s'appliquent à la présente enquête. Les droits des personnes,  rappelés dans la lettre-avis, peuvent être exercés auprès de " || Enq_RespTraitement || "."`,
    ],
    en: [
      `"In view of the favourable opinion of the National Council for Statistical Information, this survey" || (if cast(Enq_CaractereObligatoire, boolean) then ", recognized as being of general interest and of statistical quality, is mandatory" else " is recognized as being of general interest and of statistical quality without being mandatory") || ", in application of [Law n° 51-711 of 7 June 1951](" || Loi_statistique ||") on the obligation, coordination and secrecy in matters of statistics."`,
      `"Visa n°" || Enq_NumeroVisa || " of the Ministry " || Enq_MinistereTutelle || ", valid for the year " || Enq_AnneeVisa || " - Decree" || (if cast(Enq_ParutionJo,boolean) then (" dated " || Enq_DateParutionJo) else " in progress") || "."`,
      `"The answers to this questionnaire are protected by statistical secrecy and are intended for " || Enq_RespOperationnel || ". The [General Regulation 2016/679 of April 27, 2016 on data protection (RGPD)](" || Loi_rgpd || ") as well as the [law n° 78-17 of January 6, 1978 relating to data processing, files and liberties](" || Loi_informatique || "), apply to this survey. The rights of individuals, recalled in the letter-notice, can be exercised with " || Enq_RespTraitement || "."`,
    ],
  },
};

const welcomeDefault = {
  title: { fr: 'Début', en: 'Start' },
  body: {
    fr: [`"Page de commencement générique."`],
    en: ['"Generic start page."'],
  },
};

const welcomeBusiness = {
  title: { fr: 'Début', en: 'Start' },
  body: {
    fr: [`"Page de commencement entreprise`],
    en: [`"Start page for business"`],
  },
};

const welcomeMessage = {
  household: welcomeHousehold,
  business: welcomeBusiness,
  default: welcomeDefault,
};

export const getWelcomePageMessage = inseeContext =>
  welcomeMessage[inseeContext];

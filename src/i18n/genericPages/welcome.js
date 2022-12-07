const welcomeHousehold = {
  title: { fr: `Accueil`, en: `Welcome` },
  body: {
    fr: {
      value: [
        `"Bienvenue sur le questionnaire de réponse à l'" || Enq_LibelleEnquete || ".\n\n"`,
        `Enq_ObjectifsCourts`,
        `"**Qui doit répondre à ce questionnaire ?**"`,
        `whoAnswers1 || "\n\n" || whoAnswers2 || "\n\n" || whoAnswers3 || "\n\n"`,
        `""`,
      ],
      bindingDependencies: [
        'Enq_LibelleEnquete',
        'Enq_ObjectifsCourts',
        'whoAnswers1',
        'whoAnswers2',
        'whoAnswers3',
      ],
    },
    en: {
      value: [
        `"Welcome to ''" || Enq_LibelleEnquete || "'' questionnaire. \n\n"`,
        `Enq_ObjectifsCourts`,
        `"**Who should answer this questionnaire ?**"`,
        `whoAnswers1 || "\n\n" || whoAnswers2 || "\n\n" || whoAnswers3 || "\n\n"`,
        `""`,
      ],
      bindingDependencies: [
        'Enq_LibelleEnquete',
        'Enq_ObjectifsCourts',
        'whoAnswers1',
        'whoAnswers2',
        'whoAnswers3',
      ],
    },
  },
  legalTermsTitle: {
    fr: "Connaître le cadre légal de l'enquête ?",
    en: 'Know the legal terms of the survey ?',
  },
  legalTermsDetails: {
    fr: {
      value: [
        `(if nvl(cast(Enq_TestNonLabellise, boolean), false)
				  then "Cette enquête non obligatoire relève de l'exercice des missions de service public dont est investi l'Insee (articles 4, 5 et 5 bis du règlement 223/2009 relatif aux statistiques européennes, article 1 de la [loi n° 51-711 du 7 juin 1951](" || Loi_statistique ||") sur l'obligation, la coordination et le secret en matière de statistiques, décret du 14 juin 1946 organisant l'Insee)."
				  else
				    "Vu l'avis favorable du Conseil national de l'information statistique, cette enquête" 
					  || (if cast(Enq_CaractereObligatoire, boolean) 
					      then ", reconnue d’intérêt général" 
						      || (if cast(Enq_QualiteStatistique, boolean) then " et de qualité statistique" else "") 
						      || ", est obligatoire" 
					      else " est reconnue d'intérêt général" 
						      || (if cast(Enq_QualiteStatistique, boolean) then " et de qualité statistique" else "") 
						      || "sans avoir de caractère obligatoire") 
					  || ", en application de la [loi n° 51-711 du 7 juin 1951](" || Loi_statistique ||") sur l'obligation, la coordination et le secret en matière de statistiques."
				)`,
        `(if nvl(cast(Enq_TestNonLabellise, boolean), false)
				  then ""
				  else "Visa n°" || Enq_NumeroVisa || " du Ministre " || Enq_MinistereTutelle || ", valable pour l'année " || cast(Enq_AnneeVisa, string) || " - Arrêté en " || (if cast(Enq_ParutionJo,boolean) then " date du " || Enq_DateParutionJo else "cours de parution") || "."
				)`,
        `"Les réponses à ce questionnaire sont protégées par le secret statistique et destinées à " || Enq_RespOperationnel || ". Le [règlement général 2016/679 du 27 avril 2016 sur la protection des données (RGPD)](" || Loi_rgpd || ") ainsi que la [loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés](" || Loi_informatique || "), s'appliquent à la présente enquête. Ils garantissent aux personnes concernées un droit d'accès, de limitation ou de rectification pour les données les concernant. Ce droit peut être exercé auprès de " || Enq_RespTraitement || "."`,
      ],
      bindingDependencies: [
        'Enq_CaractereObligatoire',
        'Loi_statistique',
        'Enq_NumeroVisa',
        'Enq_QualiteStatistique',
        'Enq_MinistereTutelle',
        'Enq_AnneeVisa',
        'Enq_ParutionJo',
        'Enq_DateParutionJo',
        'Enq_RespOperationnel',
        'Loi_rgpd',
        'Loi_informatique',
        'Enq_RespTraitement',
        'Enq_TestNonLabellise',
      ],
    },
    en: {
      value: [
        `(if nvl(cast(Enq_TestNonLabellise, boolean), false) 
				  then "This non-compulsory survey is part of INSEE's public service remit (Articles 4, 5 and 5a of Regulation 223/2009 on European statistics, Article 1 of [Law 51-711 of 7 June 1951](" || Loi_statistique ||") on the obligation, coordination and secrecy of statistics, Decree of 14 June 1946 organising INSEE)."
				  else
				    "In view of the favourable opinion of the National Council for Statistical Information, this survey" 
				    || (if cast(Enq_CaractereObligatoire, boolean) 
				        then ", recognized as being of general interest" 
					        || (if cast(Enq_QualiteStatistique, boolean) then " and of statistical quality" else "") 
					        || ", is mandatory" 
				        else " is recognized as being of general interest" 
					        || (if cast(Enq_QualiteStatistique, boolean) then " and of statistical quality" else "") 
					        ||  " without being mandatory") 
				    || ", in application of [Law n° 51-711 of 7 June 1951](" || Loi_statistique ||") on the obligation, coordination and secrecy in matters of statistics."
				)`,
        `(if nvl(cast(Enq_TestNonLabellise, boolean), false)
				  then ""
				  else "Visa n°" || Enq_NumeroVisa || " of the Ministry " || Enq_MinistereTutelle || ", valid for the year " || Enq_AnneeVisa || " - Decree" || (if cast(Enq_ParutionJo,boolean) then (" dated " || Enq_DateParutionJo) else " in progress") || "."
				)`,
        `"The answers to this questionnaire are protected by statistical secrecy and are intended for " || Enq_RespOperationnel || ". The [General Regulation 2016/679 of April 27, 2016 on data protection (RGPD)](" || Loi_rgpd || ") as well as the [law n° 78-17 of January 6, 1978 relating to data processing, files and liberties](" || Loi_informatique || "), apply to this survey. They guarantee data subjects a right of access, limitation or rectification for data concerning them. This right can be exercised with " || Enq_RespTraitement || "."`,
      ],
      bindingDependencies: [
        'Enq_CaractereObligatoire',
        'Enq_QualiteStatistique',
        'Loi_statistique',
        'Enq_NumeroVisa',
        'Enq_MinistereTutelle',
        'Enq_AnneeVisa',
        'Enq_ParutionJo',
        'Enq_DateParutionJo',
        'Enq_RespOperationnel',
        'Loi_rgpd',
        'Loi_informatique',
        'Enq_RespTraitement',
        'Enq_TestNonLabellise',
      ],
    },
  },
};

const welcomeDefault = {
  title: { fr: 'Début', en: 'Start' },
  body: {
    fr: {
      value: [`"Page de commencement générique."`],
      bindingDependencies: [],
    },
    en: { value: ['"Generic start page."'], bindingDependencies: [] },
  },
};

const welcomeBusiness = {
  title: { fr: 'Début', en: 'Start' },
  body: {
    fr: {
      value: [`"Page de commencement entreprise`],
      bindingDependencies: [],
    },
    en: { value: [`"Start page for business"`], bindingDependencies: [] },
  },
};

const welcomeMessage = {
  household: welcomeHousehold,
  business: welcomeBusiness,
  default: welcomeDefault,
};

export const getWelcomePageMessage = (inseeContext) =>
  welcomeMessage[inseeContext];

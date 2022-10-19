const endHousehold = {
	title: { fr: `Fin`, en: `End` },
	body: {
		fr: [
			`"Votre questionnaire a bien été expédié " || validatedDate || "."`,
			`"L'Insee vous remercie de votre collaboration à cette enquête."`,
		],
		en: [
			`"Your questionnaire has been sent " || validatedDate || "."`,
			`"INSEE thanks you for your collaboration in this survey."`,
		],
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
		fr: [
			`"Page de fin générique."`,
			`"L'Insee vous remercie de votre collaboration à cette enquête."`,
		],
		en: [
			'"Generic end page."',
			`"INSEE thanks you for your collaboration in this survey."`,
		],
	},
};

const endBusiness = {
	title: { fr: 'Fin', en: 'End' },
	body: {
		fr: [`"Page de fin entreprise."`, `"Merci !"`],
		en: [`"End page for business"`, `"Thanks !"`],
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

export const getEndPageMessage = (inseeContext) => endMessage[inseeContext];
